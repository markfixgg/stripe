const prod = {
    STRIPE: {
        SECRET_KEY: "sk_test_51Iihs2Ejd6iefFvJhl8bJ1KjvsEO87QmtDaci0X5wp57VRs3sTdMHWT4bF8VkqXSz1wPqDdOZmWUzRLe5F5eT8Xx006DOogXol", // secret key
        PUBLISHABLE_KEY: "pk_test_51Iihs2Ejd6iefFvJZiqiMePDlDdKtzCyI8LhJPP14MOtN0SBMS4APlaAWpaNWx36l2JJ5nwxJHw9frjyZZrSWrYU002ABQipLZ" // public key
    },
    YOUR_DOMAIN: "http://my-vs.ru:3000", // domain where located server (for accessing static pages)
    port: 3000 // port of server instance
}

module.exports = prod;