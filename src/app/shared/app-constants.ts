class AppConstants {
    public static PAGE_SIZE_NO = [5, 10, 20, 50];
    public static TRAINING_PLAN_ACTIVE = 21;
    public static TRAINING_PLAN_DEACTIVE = 22;
    public static ROW_COUNT = 10;
    public static CREATE_UPDATE = 'Create/Update';
}

class MessageConstants {
    public static REMOVE_SESSION_CONFIRMATION  = 'Are you sure to remove a session?';
    public static UPGRADE_SKILL_CONFIRMATION = 'Are you want to upgrade skill?';
    public static ADD_SKILL_CONFIRMATION = 'Are you want to add skills?';
    public static SKILL_APPROVE_CONFIRMATION = 'Are you sure to approve skill?';
    public static APPLY_TRAINER_CONFIRMATION = 'Are you sure to apply for trainer?';
    public static FEEDBACK_REQUIRED = 'Feedback is required.';
}

class TokenConstants {
    public static ACCESS_TOKEN = 'token';
    public static REFRESH_TOKEN = 'refresh_token';
}

export {
    AppConstants,
    MessageConstants,
    TokenConstants
}