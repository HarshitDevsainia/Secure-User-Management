import reducer, { signIn, signUp, logout } from "./authSlice";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { configureStore } from "@reduxjs/toolkit";

const mock = new MockAdapter(axios);

const createTestStore = () =>
  configureStore({
    reducer: { auth: reducer },
  });

type TestStore = ReturnType<typeof createTestStore>;

describe("authSlice", () => {
  let store: TestStore;

  beforeEach(() => {
    store = createTestStore();
    localStorage.clear();
    mock.reset();
  });

  it("should handle successful signIn", async () => {
    mock.onPost("https://reqres.in/api/login").reply(200, {
      token: "abc123",
    });

    await store.dispatch(
      signIn({ email: "test@test.com", password: "123456" }) as any
    );

    const state = store.getState().auth;
    expect(state.token).toBe("abc123");
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("should handle failed signIn", async () => {
    mock.onPost("https://reqres.in/api/login").reply(400, {
      error: "Invalid credentials",
    });

    await store.dispatch(
      signIn({ email: "wrong@test.com", password: "wrong" }) as any
    );

    const state = store.getState().auth;
    expect(state.token).toBeNull();
    expect(state.error).toBe("Invalid credentials");
  });

  it("should handle successful signUp", async () => {
    mock.onPost("https://reqres.in/api/register").reply(200, {
      token: "signup123",
    });

    await store.dispatch(
      signUp({ email: "new@test.com", password: "123456" }) as any
    );

    const state = store.getState().auth;
    expect(state.token).toBe("signup123");
  });

  it("should handle failed signUp", async () => {
    mock.onPost("https://reqres.in/api/register").reply(400, {
      error: "Signup failed",
    });

    await store.dispatch(
      signUp({ email: "fail@test.com", password: "123456" }) as any
    );

    const state = store.getState().auth;
    expect(state.error).toBe("Signup failed");
  });

  it("should handle logout", () => {
    store.dispatch(logout());
    const state = store.getState().auth;
    expect(state.token).toBeNull();
  });
});
