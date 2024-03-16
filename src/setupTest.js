import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from "./mocks/server.js";

//Establish API mocking before all test
beforeAll( () => server.listen() )

/*
* Reset any requet handlers that we may add during the test
* so they dont affect other test
* */
afterEach( () => server.resetHandlers() )

// clean up aftere the test are finished
afterAll( () => server.close() ) 