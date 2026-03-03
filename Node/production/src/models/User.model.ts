import { sequelize } from '../db/index.js';
import { DataTypes } from 'sequelize';


/**
 * User Model
 */
const User = sequelize.define(
    'User',
    {
        display_name: { type: DataTypes.STRING, allowNull: false },
        first_name: { type: DataTypes.STRING, allowNull: false },
        last_name: { type: DataTypes.STRING, allowNull: false },
        slug: { type: DataTypes.STRING, allowNull: false },

        email: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },

        country_code: { type: DataTypes.INTEGER },
        mobile: { type: DataTypes.BIGINT },
        gender: { type: DataTypes.STRING(10) },
        nationality: { type: DataTypes.STRING },
        university: { type: DataTypes.STRING },
        course: { type: DataTypes.STRING },

        profile_image: { type: DataTypes.STRING },
        is_profile_image_updated: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },

        profile_banner_image: { type: DataTypes.STRING },
        profile_title: { type: DataTypes.STRING },
        profile_bio: { type: DataTypes.TEXT },

        theme_color_hex: {
            type: DataTypes.STRING(10),
            defaultValue: '#6610f2',
        },

        social_links_json: { type: DataTypes.TEXT },
        linkedin_url: { type: DataTypes.STRING },

        time_zone: {
            type: DataTypes.STRING,
            defaultValue: 'Asia/Calcutta',
        },

        currency_id: { type: DataTypes.INTEGER, allowNull: false },

        hash_tag_key: { type: DataTypes.TEXT },
        i_can_help_with: { type: DataTypes.TEXT },

        is_published: { type: DataTypes.INTEGER, defaultValue: 0 },
        status: { type: DataTypes.INTEGER, defaultValue: 1 },

        is_email_verified: { type: DataTypes.INTEGER, defaultValue: 0 },
        email_otp: { type: DataTypes.INTEGER },
        email_otp_expiration: { type: DataTypes.DATE },

        is_mobile_verified: { type: DataTypes.INTEGER, defaultValue: 0 },
        mobile_otp: { type: DataTypes.INTEGER },
        mobile_otp_expiration: { type: DataTypes.DATE },

        is_deleted: { type: DataTypes.INTEGER, defaultValue: 0 },

        user_type: {
            type: DataTypes.STRING,
            defaultValue: 'mentor',
        },

        is_email_notification_enabled: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },

        rating: { type: DataTypes.STRING },

        is_whatsapp_notification_enabled: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },

        is_availability_added: { type: DataTypes.INTEGER, defaultValue: 0 },
        is_profile_completed: { type: DataTypes.INTEGER, defaultValue: 0 },
        is_service_created: { type: DataTypes.INTEGER, defaultValue: 0 },
        is_link_added_in_bio: { type: DataTypes.INTEGER, defaultValue: 0 },
        is_bank_details_added: { type: DataTypes.INTEGER, defaultValue: 0 },

        linkedin_token: { type: DataTypes.TEXT },
        linkedin_token_expire_in: { type: DataTypes.BIGINT },

        reset_password_token: { type: DataTypes.TEXT },

        created_by: { type: DataTypes.INTEGER },
        updated_by: { type: DataTypes.INTEGER },

        main_headline: { type: DataTypes.STRING },

        country_name: { type: DataTypes.STRING },
        country_display_name: { type: DataTypes.STRING },
        country_id: { type: DataTypes.INTEGER },
        country_origin: { type: DataTypes.STRING },

        notification_view: { type: DataTypes.INTEGER },
        city: { type: DataTypes.STRING },
        superpower: { type: DataTypes.STRING },

        profile_views: { type: DataTypes.BIGINT },
        total_profile_views: { type: DataTypes.BIGINT },
        last_month_profile_views: { type: DataTypes.BIGINT },
        last_month_booking_count: { type: DataTypes.BIGINT },
        last_month_earning: { type: DataTypes.BIGINT },
        profile_views_percentage: { type: DataTypes.FLOAT },

        reschedule_count: { type: DataTypes.INTEGER, defaultValue: 0 },

        industry: { type: DataTypes.STRING },
        can_help_you: { type: DataTypes.STRING },
        career_goal: { type: DataTypes.STRING },
        visa_type: { type: DataTypes.STRING },
        qualification: { type: DataTypes.STRING },
        keywords: { type: DataTypes.STRING },

        journey: { type: DataTypes.TEXT },
        about: { type: DataTypes.TEXT },
        tags: { type: DataTypes.STRING },

        sequence: { type: DataTypes.STRING },
        offer_received: { type: DataTypes.TEXT },
        how_you_want_access: { type: DataTypes.STRING },

        is_international_student_mentor: {
            type: DataTypes.ENUM('yes', 'no'),
        },

        is_setting_reviwed: { type: DataTypes.INTEGER, defaultValue: 0 },
        is_book_launch_call: { type: DataTypes.INTEGER, defaultValue: 0 },
        is_payout_connected: { type: DataTypes.INTEGER, defaultValue: 0 },

        payout_account_id: { type: DataTypes.STRING },

        last_login_at: { type: DataTypes.STRING },

        mentor_order: { type: DataTypes.INTEGER },

        joining_date: { type: DataTypes.DATEONLY },

        mentor_no_show_count: { type: DataTypes.INTEGER, defaultValue: 0 },
        need_action_count: { type: DataTypes.INTEGER, defaultValue: 0 },

        section: { type: DataTypes.ARRAY(DataTypes.INTEGER) },

        seo_industry: { type: DataTypes.TEXT },
        seo_company: { type: DataTypes.TEXT },
        seo_specialization: { type: DataTypes.TEXT },

        is_notified_admin_about_publish: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    },
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

/* ================= ASSOCIATIONS ================= */

// Currency.hasMany(User, {
//     foreignKey: 'currency_id',
//     onDelete: 'SET NULL',
//     onUpdate: 'CASCADE',
// });

// User.belongsTo(Currency, {
//     foreignKey: 'currency_id',
// });

// Country.hasMany(User, {
//     foreignKey: 'country_id',
// });

// User.belongsTo(Country, {
//     foreignKey: 'country_id',
// });

/* ================= HOOKS ================= */

// User.afterCreate('createDefaultSchedule', async (user) => {
//   if (user.user_type !== 'mentor') return;

//   const { default: AvailabilitySchedule } = await import('./AvailabilitySchedule.model.js');
//   const { default: AvailabilityCalendar } = await import('./AvailabilityCalendar.model.js');
//   const { default: ScheduleWeekDayTime } = await import('./ScheduleWeekDayTime.model.js');

//   const schedule = await AvailabilitySchedule.create({
//     mentor_id: user.id,
//     schedule_name: 'Weekly Hours',
//     is_default: 1,
//     created_by: user.id,
//     updated_by: user.id,
//   });

//   await AvailabilityCalendar.create({
//     mentor_id: user.id,
//     created_by: user.id,
//     updated_by: user.id,
//   });

//   await ScheduleWeekDayTime.bulkCreate([
//     {
//       schedule_id: schedule.id,
//       week_day: 'SAT',
//       start_time: '09:00',
//       end_time: '20:00',
//       created_by: user.id,
//       updated_by: user.id,
//     },
//     {
//       schedule_id: schedule.id,
//       week_day: 'SUN',
//       start_time: '09:00',
//       end_time: '20:00',
//       created_by: user.id,
//       updated_by: user.id,
//     },
//   ]);
// });

export default User;
