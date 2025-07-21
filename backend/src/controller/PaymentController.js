const vnpayService = require('../service/VnPayService');

const createPaymentUrl = async (req, res) => {
  try {
    const response = await vnpayService.createPaymentUrl(req);
    res.json({ redirectUrl: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

const vnpayReturn = async (req, res) => {
  try {
    const result = await vnpayService.verifyReturnUrl(req);
    if (result.success) {
      res.redirect(`http://localhost:8081/cart/?alert=${encodeURIComponent(result.message)}`);
    } else {
      res.redirect(`http://localhost:8081/cart/?alert=${encodeURIComponent(result.message)}`);
    }
  } catch (error) {
    console.error(error);
    res.redirect(`http://localhost:8081/cart/?alert=${encodeURIComponent('Thanh toán thất bại')}`);
  }
};

module.exports = {
  createPaymentUrl,
  vnpayReturn
}; 