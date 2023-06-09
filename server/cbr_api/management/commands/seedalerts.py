from django.core.management.base import BaseCommand
from cbr_api import models
import random
import uuid


class Command(BaseCommand):
    def handle(self, *args, **options):
        users = models.UserCBR.objects.all()

        userIDs = []
        for user in users:
            userIDs.append(user.id)

        def getYearTimestamp(self, year):
            return (year - 1970) * (60 * 60 * 24 * 365)

        def createAlert(self, id, priority, subject, alert_message):
            alert = models.Alert.objects.create(
                id=id,
                priority=priority,
                subject=subject,
                alert_message=alert_message,
                unread_by_users=[
                    random.choice(userIDs),
                    random.choice(userIDs),
                    random.choice(userIDs),
                ],
                created_by_user=random.choice(users),
                created_date=random.randint(
                    getYearTimestamp(self, 2017), getYearTimestamp(self, 2018)
                ),
            )
            return alert

        if models.UserCBR.objects.all().count() == 0:
            self.stdout.write(
                self.style.ERROR("Users have not been created! Run seedusers first!")
            )
            return

        if models.Alert.objects.all().count() > 0:
            self.stdout.write(self.style.ERROR("Alerts have already been created!"))
            return

        createAlert(
            self,
            uuid.uuid4(),
            models.Alert.Priorities.MEDIUM,
            "MEDIUM Alert Test",
            "For workers who have not yet picked up their free ice cream, you\
            have 24 minutes to do so.",
        )

        createAlert(
            self,
            uuid.uuid4(),
            models.Alert.Priorities.LOW,
            "LOW Alert Test",
            "Friendly reminder to all workers: free ice cream today!",
        )

        createAlert(
            self,
            uuid.uuid4(),
            models.Alert.Priorities.HIGH,
            "HIGH Alert Test",
            "Please do not forget to manually sync data from your phone when\
            you reconnect to the internet",
        )

        self.stdout.write(self.style.SUCCESS("Alerts successfully created!"))
