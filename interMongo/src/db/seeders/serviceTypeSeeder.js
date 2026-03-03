const sequelize = require('.');
const ServiceType = require('../../models/ServiceType.model');

const seedServiceTypeMaster = async () => {
    const serviceTypeMasterData = [
        { id: 1, name: '1:1 Call', "desc": 'Perform individual video sessions', icon_class: 'contact.svg', sequence: 1 },
        { id: 2, name: 'Priority DM', "desc": 'Organize your priority inbox', icon_class: 'sms.svg', sequence: 2 },
        { id: 3, name: 'Digital Product', "desc": 'Offering digital products, courses, and more', icon_class: 'folder_1.svg', sequence: 3 },
    ]

    await ServiceType.bulkCreate(serviceTypeMasterData, {
        updateOnDuplicate: ['name', 'desc', 'icon_class', 'sequence']
    });
}

module.exports = seedServiceTypeMaster;