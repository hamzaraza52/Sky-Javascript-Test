const rewardsService = require('./redeemService')
const constants = require('./constants')

describe('reward service', () => {
  const customerAccountNumber = '123456'
  const portfolio = [constants.SPORTS, constants.KIDS, constants.MOVIES, constants.NEWS, constants.MUSIC]
  it('should return correct rewards when customer is eligible', () => {
    const eligiblityServiceMock = () => (constants.CUSTOMER_ELIGIBLE)
    const results = rewardsService({ customerAccountNumber, portfolio, eligibilityService: eligiblityServiceMock })
    expect(results.data.rewards).toEqual([constants.CHAMPIONS_LEAGUE_FINAL_TICKET, constants.PIRATES_OF_THE_CARIBBEAN_COLLECTION, constants.KARAOKE_PRO_MICROPHONE])
  });
  it('should return null rewards when customer is ineligible', () => {
    const eligiblityServiceMock = () => (constants.CUSTOMER_INELIGIBLE)
    const results = rewardsService({ customerAccountNumber, portfolio, eligibilityService: eligiblityServiceMock })
    expect(results.data.rewards).toBe(null);
  });
  it('should return null rewards when eligibilty service returns failiure', () => {
    const eligiblityServiceMock = () => (constants.TECHNICAL_FALIURE_EXCEPTION)
    const results = rewardsService({ customerAccountNumber, portfolio, eligibilityService: eligiblityServiceMock })
    expect(results.data.rewards).toBe(null);
  });
  it('should return null rewards and return error when customer is invalid', () => {
    const eligiblityServiceMock = () => (constants.INVALID_ACCOUNT_NUMBER_EXCEPTION)
    const results = rewardsService({ customerAccountNumber, portfolio, eligibilityService: eligiblityServiceMock })
    expect(results.data.rewards).toBe(null);
    expect(results.data.error).toEqual("account number is invalid");

  });

})