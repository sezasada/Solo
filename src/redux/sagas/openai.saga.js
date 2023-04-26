import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* openaisaga(action) {
  try {
    const response = yield axios.post(
      "/api/openai/generate",
      { text: action.payload },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    yield put({ type: "SET_GENERATED_TEXT", payload: response.data.message });
  } catch (error) {
    console.log("Error:", error);
  }
}

function* watchFetchOpenAi() {
  yield takeEvery("FETCH_OPEN_AI", openaisaga);
}

export default watchFetchOpenAi;

