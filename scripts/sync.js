require("../server/db/index")
    .pg
    .sync({
        force: true
    })
    .then(() => {
        console.log('\nsyncDB successfully completed capitan\n\td_(^_^)');
        process.exit(0);
    })
    .catch(err => {
        console.log(`\nsyncDB failed\n\t(T_T)\n read the message: ${err.message}`);
        process.exit(1);
    });