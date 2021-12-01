# Generated by Django 3.2.5 on 2021-07-29 03:53
import os

from django.core.exceptions import ValidationError
from django.db import migrations

from cbr import settings


def move_client_images(app_registry, schema_editor):
    print("\nBeginning to move client pictures into new directory")
    Client = app_registry.get_model("cbr_api", "Client")

    paths_to_not_delete = set()
    for client in Client.objects.exclude(picture__exact="").iterator():
        picture_fails_validation = False
        try:
            client.clean_fields()
        except ValidationError as error:
            print(f"client id {client.pk}: has invalid fields")
            try:
                print(f"error dict: {error.message_dict}")
                if error.message_dict.get("picture") is not None:
                    # Error with the picture --- might be too large. We imposed a new file-size limit.
                    print(f"picture has error")
                    picture_fails_validation = True
            except AttributeError:
                pass

        try:
            old_path = client.picture.path
        except ValueError:
            # File doesn't exist; clear the field out since it doesn't refer to an actual file.
            print(
                f"{client.full_name} (id {client.pk}) picture {client.picture.name} doesn't exist; deleting"
            )
            client.picture.delete()
            continue

        old_dirname, old_filename = os.path.split(old_path)
        old_dirname: str = old_dirname.rstrip("/").lstrip("/")
        if not old_dirname.endswith("images") or old_dirname.count("/") != 1:
            print(
                f"{client.full_name} (id {client.pk}) picture {old_path} not in expected directory; not moving it"
            )
            continue

        if picture_fails_validation:
            print(
                f"deleting picture for client id {client.pk} since it failed validation"
            )
            client.picture.delete()
            continue

        # This should call the generate_filename function, which will save this image file with the expected name
        # and into the new directory. However, this doesn't delete the old file.
        client.picture.save(client.picture.name, client.picture.file)
        # If for some reason this didn't move the picture file, don't delete it later.
        if client.picture.path == old_path:
            print(
                f"{client.full_name} (id {client.pk}) picture {client.picture.path} didn't move; not deleting"
            )
            paths_to_not_delete.add(old_path)

    # Delete any leftover files. This will also delete orphaned files not connected to any client.
    old_images_dir = os.path.join(settings.MEDIA_ROOT, "images")
    for (dir_path, dir_names, filenames) in os.walk(old_images_dir):
        for file in filenames:
            path_to_delete: str = os.path.join(dir_path, file)

            # The way images were uploaded in previous versions made all uploads as PNG pictures, but check for other
            # expected image extensions.
            if (
                path_to_delete.endswith(".png")
                or path_to_delete.endswith(".jpg")
                or path_to_delete.endswith(".jpeg")
            ) and path_to_delete not in paths_to_not_delete:
                print(f"deleting {path_to_delete}")
                os.remove(os.path.join(dir_path, file))
            else:
                print(f"not deleting {path_to_delete}")
        break

    print("Finished moving client pictures")


class Migration(migrations.Migration):
    dependencies = [
        ("cbr_api", "0019_alter_client_picture"),
    ]

    operations = [
        migrations.RunPython(move_client_images),
    ]