// wraps all endpoints in try/catch
const ctrlWrapper = (ctrl) => {
    const func = async (req, res) => {
        try {
            await ctrl(req, res)
        } catch (error) {
            res.status(error.status || 500).json({
                error: error.message || "Internal Server Error",
            })
        }
    }

    return func
}

module.exports = ctrlWrapper
