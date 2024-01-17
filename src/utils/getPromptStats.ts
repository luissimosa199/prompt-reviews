export async function getPromptStats(_id: string) {
  try {
    // fetch, count & average opinions to return rank & votes
    return {
      success: true,
      rank: 4,
      votes: 10,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);

      return {
        success: false,
        rank: 0,
        votes: 0,
      };
    } else {
      console.error(error);
      return {
        success: false,
        rank: 0,
        votes: 0,
      };
    }
  }
}
