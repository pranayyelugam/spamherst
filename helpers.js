
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

function isRegistered(member) {
    return !member.roles.cache.find((r) => r.name === "UMass")
}

function getRoleById(roleId, guild) {
    return guild.roles.cache.find((r) => r.id == roleId);
}

module.exports = { hasRole, isAuthorModerator, isRegistered, getRoleById }