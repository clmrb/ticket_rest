let instance = null;

module.exports = {
    setInstance(connection) {
        instance = connection;
    },
    getInstance() {
        return instance;
    }
};
