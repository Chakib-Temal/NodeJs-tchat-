/**
 * Created by macbookpro on 18/06/2017.
 */
function User () {
    this.username = "";
    this.password = "";
    this.email = "";
}

User.prototype = {
    setUserName : function (username) {
        this.username = username;
    },

    getUserName: function () {
        return this.username;
    },

    setPassword : function (password) {
        this.password = password;
    },

    getPassword: function () {
        return this.password;
    },

    setEmail : function (email) {
        this.email = email;
    },

    getEmail: function () {
        return this.email;
    }
};


module.exports = User;
