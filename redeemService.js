const constants = require('./constants')
const rewards = {
  sports: constants.CHAMPIONS_LEAGUE_FINAL_TICKET,
  music: constants.KARAOKE_PRO_MICROPHONE,
  movies: constants.PIRATES_OF_THE_CARIBBEAN_COLLECTION,
  kids: undefined,
  news: undefined
}
function rewardsService({ customerAccountNumber, portfolio, eligibilityService }) {
  const eligibility = eligibilityService(customerAccountNumber)
  let outcomes;
  if (eligibility === constants.CUSTOMER_ELIGIBLE) {
    // this loop statments loops through the customer portfolio to see if there are any rewards
    let i;
    let gifts = [];
    for (i = 0; i < portfolio.length; i++) {
      const channel = portfolio[i]
      const gift = rewards[channel]
      // if that channel does not return rewrd it will not be added to the array
      if (gift != undefined) { gifts.push(gift) }
    }
    outcomes = {
      rewards: gifts
    }
  }
  if (eligibility === constants.CUSTOMER_INELIGIBLE || eligibility === constants.TECHNICAL_FALIURE_EXCEPTION) {
    outcomes = { rewards: null }
  }
  if (eligibility === constants.INVALID_ACCOUNT_NUMBER_EXCEPTION) {
    // A error message is returned when the account is invalid
    outcomes = { rewards: null, error: 'account number is invalid' }
  }
  return {
    data: outcomes,
  }
};
module.exports = rewardsService;
