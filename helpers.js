const client = require('./client.js')
const config = require('./config/config.json')
const rolesSchema = require('./database/Schemas/RolesSchema');
const channelschema = require('./database/Schemas/ChannelSchema');


function hasRole(member, roleName) {
    return !!member.roles.cache.find((r) => r.name === roleName);
}

function isAuthorModerator(message) {
    if (message.member.roles.hoist) {
        return message.member.roles.hoist.name === MODERATOR_ROLE_NAME;
    } else {
        return false
    }
}

const findRoleIdByName = (roleName) => {
    rolesSchema.find({
        roleName: roleName
    }).then(result => {

        const [{ roleId, roleName }] = result
        return roleId;
    })
}

const findChannelIdByName = (channelName) => {
    channelschema.find({
        channelName: channelName
    }).then(result => {
        return result;
    })
}

function textLog(text) {
    const outputChannel = client.channels.resolve(config.channelIds.botLogs);
    return outputChannel.send(text);
}

function isRegistered(member) {
    return !member.roles.cache.find((r) => r.name === "UMass")
}

function getRoleById(roleId, guild) {
    return guild.roles.cache.find((r) => r.id == roleId);
}

module.exports = { hasRole, isAuthorModerator, isRegistered, getRoleById, textLog, findRoleIdByName, findChannelIdByName }