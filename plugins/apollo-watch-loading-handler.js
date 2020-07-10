/* eslint-disable no-undef */
export default (isLoading, countModifier, nuxtContext) => {
  loading += countModifier
  // eslint-disable-next-line no-undef
  console.log('Global loading', loading, countModifier)
}
