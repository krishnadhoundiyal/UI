var AirflowConfig = {};
export const updateAirflowConfig = (elements) => {
    AirflowConfig = {...elements};
  }
export const getAirFlowConfig = () => {
  return AirflowConfig;
}
