// eslint-disable
export const createSurvey = `mutation CreateSurvey($input: CreateSurveyInput!) {
  createSurvey(input: $input) {
    id
    FirstName
    LastName
    Participation
  }
}
`;
export const updateSurvey = `mutation UpdateSurvey($input: UpdateSurveyInput!) {
  updateSurvey(input: $input) {
    id
    FirstName
    LastName
    Participation
  }
}
`;
export const deleteSurvey = `mutation DeleteSurvey($input: DeleteSurveyInput!) {
  deleteSurvey(input: $input) {
    id
    FirstName
    LastName
    Participation
  }
}
`;
