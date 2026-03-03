import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        display_name: { type: String, required: true },
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        slug: { type: String, required: true, index: true },

        email: { type: String, required: true, index: true },
        password: { type: String, required: true },

        country_code: Number,
        mobile: Number,
        gender: String,
        nationality: String,
        university: String,
        course: String,

        profile_image: String,
        is_profile_image_updated: { type: Number, default: 0 },

        profile_banner_image: String,
        profile_title: String,
        profile_bio: String,

        theme_color_hex: { type: String, default: '#6610f2' },

        social_links_json: String,
        linkedin_url: String,

        time_zone: { type: String, default: 'Asia/Calcutta' },

        currency_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Currency'
        },

        hash_tag_key: String,
        i_can_help_with: String,

        is_published: { type: Number, default: 0 },
        status: { type: Number, default: 1 },

        is_email_verified: { type: Number, default: 0 },
        email_otp: Number,
        email_otp_expiration: Date,

        is_mobile_verified: { type: Number, default: 0 },
        mobile_otp: Number,
        mobile_otp_expiration: Date,

        is_deleted: { type: Number, default: 0 },

        user_type: { type: String, default: 'mentor' },

        is_email_notification_enabled: { type: Number, default: 1 },
        rating: String,

        is_whatsapp_notification_enabled: { type: Number, default: 0 },

        is_availability_added: { type: Number, default: 0 },
        is_profile_completed: { type: Number, default: 0 },
        is_service_created: { type: Number, default: 0 },
        is_link_added_in_bio: { type: Number, default: 0 },
        is_bank_details_added: { type: Number, default: 0 },

        linkedin_token: String,
        linkedin_token_expire_in: Number,

        reset_password_token: String,

        created_by: Number,
        updated_by: Number,

        main_headline: String,

        country_name: String,
        country_display_name: String,

        country_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Country'
        },

        country_origin: String,

        notification_view: Number,
        city: String,
        superpower: String,

        profile_views: Number,
        total_profile_views: Number,
        last_month_profile_views: Number,
        last_month_booking_count: Number,
        last_month_earning: Number,
        profile_views_percentage: Number,

        reschedule_count: { type: Number, default: 0 },

        industry: String,
        can_help_you: String,
        career_goal: String,
        visa_type: String,
        qualification: String,
        keywords: String,

        journey: String,
        about: String,
        tags: String,

        sequence: String,
        offer_received: String,
        how_you_want_access: String,

        is_international_student_mentor: {
            type: String,
            enum: ['yes', 'no']
        },

        is_setting_reviwed: { type: Number, default: 0 },
        is_book_launch_call: { type: Number, default: 0 },
        is_payout_connected: { type: Number, default: 0 },

        payout_account_id: String,

        last_login_at: String,

        mentor_order: Number,

        joining_date: Date,

        mentor_no_show_count: { type: Number, default: 0 },
        need_action_count: { type: Number, default: 0 },

        section: [Number],   // replaces ARRAY(INTEGER)

        seo_industry: String,
        seo_company: String,
        seo_specialization: String,

        is_notified_admin_about_publish: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

export default mongoose.model('User', userSchema);