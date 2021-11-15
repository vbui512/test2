import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: "users",
            columns: [
                { name: "username", type: "string" },
                { name: "password", type: "string" },
                { name: "first_name", type: "string" },
                { name: "last_name", type: "string" },
                { name: "phone_number", type: "string", isOptional: true },
                { name: "role", type: "string" },
                { name: "zone", type: "number" },
                { name: "is_active", type: "boolean", isOptional: true },
                { name: "created_at", type: "number" },
                { name: "updated_at", type: "number" },
            ],
        }),
        tableSchema({
            name: "clients",
            columns: [
                { name: "user_id", type: "string", isIndexed: true },
                { name: "first_name", type: "string" },
                { name: "last_name", type: "string" },
                { name: "full_name", type: "string" },
                { name: "birth_date", type: "number" },
                { name: "gender", type: "string" },
                { name: "phone_number", type: "string", isOptional: true },
                { name: "disability", type: "string" },
                { name: "other_disability", type: "string", isOptional: true },
                { name: "longitude", type: "string", isOptional: true },
                { name: "latitude", type: "string", isOptional: true },
                { name: "zone", type: "number" },
                { name: "village", type: "string" },
                { name: "picture", type: "string", isOptional: true },
                { name: "caregiver_present", type: "boolean" },
                { name: "caregiver_name", type: "string", isOptional: true },
                { name: "caregiver_phone", type: "string", isOptional: true },
                { name: "caregiver_email", type: "string", isOptional: true },
                { name: "health_risk_level", type: "string" },
                { name: "health_timestamp", type: "number" },
                { name: "social_risk_level", type: "string" },
                { name: "social_timestamp", type: "number" },
                { name: "educat_risk_level", type: "string" },
                { name: "educat_timestamp", type: "number" },
                { name: "last_visit_date", type: "number" },
                { name: "created_at", type: "number" },
                { name: "updated_at", type: "number" },
            ],
        }),
        tableSchema({
            name: "risks",
            columns: [
                { name: "client_id", type: "string", isIndexed: true },
                { name: "risk_type", type: "string" },
                { name: "risk_level", type: "string" },
                { name: "requirement", type: "string" },
                { name: "goal", type: "string" },
                { name: "timestamp", type: "number" },
            ],
        }),
        tableSchema({
            name: "referrals",
            columns: [
                { name: "date_referred", type: "number" },
                { name: "date_resolved", type: "number" },
                { name: "resolved", type: "boolean" },
                { name: "outcome", type: "string" },
                { name: "picture", type: "string", isOptional: true },
                { name: "wheelchair", type: "boolean" },
                { name: "wheelchair_experience", type: "string" },
                { name: "hip_width", type: "number" },
                { name: "wheelchair_owned", type: "boolean" },
                { name: "wheelchair_repairable", type: "boolean" },
                { name: "physiotherapy", type: "boolean" },
                { name: "condition", type: "string" },
                { name: "prosthetic", type: "boolean" },
                { name: "prosthetic_injury_location", type: "string" },
                { name: "orthotic", type: "boolean" },
                { name: "orthotic_injury_location", type: "string" },
                { name: "services_other", type: "string" },
                { name: "client_id", type: "string", isIndexed: true },
                { name: "user_id", type: "string", isIndexed: true },
                { name: "created_at", type: "number" },
                { name: "updated_at", type: "number" },
            ],
        }),
        tableSchema({
            name: "surveys",
            columns: [
                { name: "client_id", type: "string", isIndexed: true },
                { name: "user_id", type: "string", isIndexed: true },
                { name: "survey_date", type: "number" },
                { name: "health", type: "string" },
                { name: "health_have_rehabilitation_access", type: "boolean" },
                { name: "health_need_rehabilitation_access", type: "boolean" },
                { name: "health_have_assistive_device", type: "boolean" },
                { name: "health_working_assistive_device", type: "boolean" },
                { name: "health_need_assistive_device", type: "boolean" },
                { name: "health_assistive_device_type", type: "string", isOptional: true },
                { name: "health_services_satisfaction", type: "string" },
                { name: "school_currently_attend", type: "boolean" },
                { name: "school_grade", type: "number", isOptional: true },
                { name: "school_not_attend_reason", type: "string", isOptional: true },
                { name: "school_ever_attend", type: "boolean" },
                { name: "school_want_attend", type: "boolean" },
                { name: "social_community_valued", type: "boolean" },
                { name: "social_independent", type: "boolean" },
                { name: "social_able_participate", type: "boolean" },
                { name: "social_affected_by_disability", type: "boolean" },
                { name: "social_discrimination", type: "boolean" },
                { name: "work", type: "boolean" },
                { name: "work_what", type: "string", isOptional: true },
                { name: "work_status", type: "string", isOptional: true },
                { name: "work_meet_financial_needs", type: "boolean" },
                { name: "work_affected_by_disability", type: "boolean" },
                { name: "work_want", type: "boolean" },
                { name: "food_security", type: "string" },
                { name: "food_enough_monthly", type: "boolean" },
                { name: "food_enough_for_child", type: "string", isOptional: true },
                { name: "empowerment_organization_member", type: "boolean" },
                { name: "empowerment_organization", type: "string", isOptional: true },
                { name: "empowerment_rights_awareness", type: "boolean" },
                { name: "empowerment_influence_others", type: "boolean" },
                { name: "shelter_adequate", type: "boolean" },
                { name: "shelter_essential_access", type: "boolean" },
                { name: "created_at", type: "number" },
            ],
        }),
        tableSchema({
            name: "visits",
            columns: [
                { name: "client_id", type: "string", isIndexed: true },
                { name: "user_id", type: "string" },
                { name: "health_visit", type: "boolean" },
                { name: "educat_visit", type: "boolean" },
                { name: "social_visit", type: "boolean" },
                { name: "longitude", type: "string", isOptional: true },
                { name: "latitude", type: "string", isOptional: true },
                { name: "zone", type: "number" },
                { name: "village", type: "string" },
                { name: "created_at", type: "number" },
            ],
        }),
        tableSchema({
            name: "outcomes",
            columns: [
                { name: "visit_id", type: "string", isIndexed: true },
                { name: "risk_type", type: "string" },
                { name: "goal_met", type: "string" },
                { name: "outcome", type: "string" },
            ],
        }),
        tableSchema({
            name: "improvements",
            columns: [
                { name: "visit_id", type: "string", isIndexed: true },
                { name: "risk_type", type: "string" },
                { name: "provided", type: "string" },
                { name: "desc", type: "string" },
            ],
        }),
    ],
});
