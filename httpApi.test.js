const httpApiModule = require("./httpApi");

const callbackGetIndexes = {
  home: 0,
  getAuthenticationProcess: 1,
  discoverDevices: 2,
  getDevices: 3,
  getDevicesByType: 4,
  getDevicesByDriver: 5,
  getDeviceById: 6,
  getDriverPairingInstructions: 7,
  getDeviceFailedRemovalInstructions: 8,
  getDrivers: 9,
  getCommands: 10,
  getEventDescriptions: 11,
  getLatestCommandEvents: 12,
  getEventsByType: 13,
  pairingMode: 14
};

const callbackPostIndexes = {
  authenticationStep: 0,
  runCommand: 1,
  removeDevice: 2
};

describe("httpApi", () => {
  it("should return the app object", () => {
    const bodyParser = {
      json: jest.fn()
    };
    const authenticateCtrl = {};
    const eventCtrl = {};
    const driverCtrl = {};
    const interfaceCtrl = {};
    const app = {
      get: jest.fn(),
      post: jest.fn(),
      use: jest.fn()
    };
    const drivers = {};
    const httpApi = httpApiModule(
      bodyParser,
      authenticateCtrl,
      eventCtrl,
      driverCtrl,
      interfaceCtrl,
      app,
      drivers
    );

    expect(httpApi).toEqual(app);
  });
  describe("error handler", () => {
    it("should setup an error listener", () => {
      const bodyParser = {
        json: jest.fn()
      };
      const authenticateCtrl = {};
      const eventCtrl = {};
      const driverCtrl = {};
      const interfaceCtrl = {};
      const app = {
        get: jest.fn(),
        post: jest.fn(),
        use: jest.fn()
      };
      const drivers = {};
      httpApiModule(
        bodyParser,
        authenticateCtrl,
        eventCtrl,
        driverCtrl,
        interfaceCtrl,
        app,
        drivers
      );

      expect(app.use).toHaveBeenCalledTimes(1);
      expect(typeof app.use.mock.calls[0][0]).toEqual("function");
    });

    it("should handle Driver errors", () => {
      const bodyParser = {
        json: jest.fn()
      };
      const authenticateCtrl = {};
      const eventCtrl = {};
      const driverCtrl = {};
      const interfaceCtrl = {};
      const app = {
        get: jest.fn(),
        post: jest.fn(),
        use: jest.fn()
      };
      const drivers = {};
      httpApiModule(
        bodyParser,
        authenticateCtrl,
        eventCtrl,
        driverCtrl,
        interfaceCtrl,
        app,
        drivers
      );

      expect(app.use).toHaveBeenCalledTimes(1);
      const errorHandler = app.use.mock.calls[0][0];

      const err = new Error("Error message");
      err.type = "Driver";
      err.driver = "DriverId";

      const req = {};
      const res = {
        status: jest.fn(),
        json: jest.fn()
      };
      const next = jest.fn();
      errorHandler(err, req, res, next);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        type: "Driver",
        driver: "DriverId",
        message: "Error message"
      });
    });

    it("should handle BadRequest errors", () => {
      const bodyParser = {
        json: jest.fn()
      };
      const authenticateCtrl = {};
      const eventCtrl = {};
      const driverCtrl = {};
      const interfaceCtrl = {};
      const app = {
        get: jest.fn(),
        post: jest.fn(),
        use: jest.fn()
      };
      const drivers = {};
      httpApiModule(
        bodyParser,
        authenticateCtrl,
        eventCtrl,
        driverCtrl,
        interfaceCtrl,
        app,
        drivers
      );

      expect(app.use).toHaveBeenCalledTimes(1);
      const errorHandler = app.use.mock.calls[0][0];

      const err = new Error("Error message");
      err.type = "BadRequest";

      const req = {};
      const res = {
        status: jest.fn(),
        json: jest.fn()
      };
      const next = jest.fn();
      errorHandler(err, req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        type: "BadRequest",
        message: "Error message"
      });
    });

    it("should be handle NotFound errors", () => {
      const bodyParser = {
        json: jest.fn()
      };
      const authenticateCtrl = {};
      const eventCtrl = {};
      const driverCtrl = {};
      const interfaceCtrl = {};
      const app = {
        get: jest.fn(),
        post: jest.fn(),
        use: jest.fn()
      };
      const drivers = {};
      httpApiModule(
        bodyParser,
        authenticateCtrl,
        eventCtrl,
        driverCtrl,
        interfaceCtrl,
        app,
        drivers
      );

      expect(app.use).toHaveBeenCalledTimes(1);
      const errorHandler = app.use.mock.calls[0][0];

      const err = new Error("Error message");
      err.type = "NotFound";

      const req = {};
      const res = {
        status: jest.fn(),
        json: jest.fn()
      };
      const next = jest.fn();
      errorHandler(err, req, res, next);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        type: "NotFound",
        message: "Error message"
      });
    });

    it("should handle Validation errors", () => {
      const bodyParser = {
        json: jest.fn()
      };
      const authenticateCtrl = {};
      const eventCtrl = {};
      const driverCtrl = {};
      const interfaceCtrl = {};
      const app = {
        get: jest.fn(),
        post: jest.fn(),
        use: jest.fn()
      };
      const drivers = {};
      httpApiModule(
        bodyParser,
        authenticateCtrl,
        eventCtrl,
        driverCtrl,
        interfaceCtrl,
        app,
        drivers
      );

      expect(app.use).toHaveBeenCalledTimes(1);
      const errorHandler = app.use.mock.calls[0][0];

      const err = new Error("Error message");
      err.type = "Validation";
      err.errors = {
        foo: "bar"
      };

      const req = {};
      const res = {
        status: jest.fn(),
        json: jest.fn()
      };
      const next = jest.fn();
      errorHandler(err, req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        type: "Validation",
        errors: { foo: "bar" },
        message: "Error message"
      });
    });

    it("should handle Connection errors", () => {
      const bodyParser = {
        json: jest.fn()
      };
      const authenticateCtrl = {};
      const eventCtrl = {};
      const driverCtrl = {};
      const interfaceCtrl = {};
      const app = {
        get: jest.fn(),
        post: jest.fn(),
        use: jest.fn()
      };
      const drivers = {};
      httpApiModule(
        bodyParser,
        authenticateCtrl,
        eventCtrl,
        driverCtrl,
        interfaceCtrl,
        app,
        drivers
      );

      expect(app.use).toHaveBeenCalledTimes(1);
      const errorHandler = app.use.mock.calls[0][0];

      const err = new Error("Error message");
      err.type = "Connection";

      const req = {};
      const res = {
        status: jest.fn(),
        json: jest.fn()
      };
      const next = jest.fn();
      errorHandler(err, req, res, next);
      expect(res.status).toHaveBeenCalledWith(503);
      expect(res.json).toHaveBeenCalledWith({
        type: "Connection",
        message: "Error message"
      });
    });

    it("should handle Authentication errors", () => {
      const bodyParser = {
        json: jest.fn()
      };
      const authenticateCtrl = {};
      const eventCtrl = {};
      const driverCtrl = {};
      const interfaceCtrl = {};
      const app = {
        get: jest.fn(),
        post: jest.fn(),
        use: jest.fn()
      };
      const drivers = {};
      httpApiModule(
        bodyParser,
        authenticateCtrl,
        eventCtrl,
        driverCtrl,
        interfaceCtrl,
        app,
        drivers
      );

      expect(app.use).toHaveBeenCalledTimes(1);
      const errorHandler = app.use.mock.calls[0][0];

      const err = new Error("Error message");
      err.type = "Authentication";

      const req = {};
      const res = {
        status: jest.fn(),
        json: jest.fn()
      };
      const next = jest.fn();
      errorHandler(err, req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        type: "Authentication",
        message: "Error message"
      });
    });

    it("should handle Internal errors", () => {
      const bodyParser = {
        json: jest.fn()
      };
      const authenticateCtrl = {};
      const eventCtrl = {};
      const driverCtrl = {};
      const interfaceCtrl = {};
      const app = {
        get: jest.fn(),
        post: jest.fn(),
        use: jest.fn()
      };
      const drivers = {};
      httpApiModule(
        bodyParser,
        authenticateCtrl,
        eventCtrl,
        driverCtrl,
        interfaceCtrl,
        app,
        drivers
      );

      expect(app.use).toHaveBeenCalledTimes(1);
      const errorHandler = app.use.mock.calls[0][0];

      const err = new Error("Error message");
      err.type = "Unknown";

      const req = {};
      const res = {
        status: jest.fn(),
        json: jest.fn()
      };
      const next = jest.fn();
      errorHandler(err, req, res, next);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        type: "Internal"
      });
    });
  });

  describe("Endpoints", () => {
    describe("/", () => {
      it("should return json", () => {
        const bodyParser = {
          json: jest.fn()
        };
        const authenticateCtrl = {};
        const eventCtrl = {};
        const driverCtrl = {};
        const interfaceCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(app.get.mock.calls[callbackGetIndexes.home][0]).toEqual("/");
        const callback = app.get.mock.calls[callbackGetIndexes.home][1];
        expect(typeof callback).toEqual("function");
        const req = {};
        const res = {
          json: jest.fn()
        };
        callback(req, res);
        expect(res.json).toHaveBeenCalledWith({ Thinglator: "Oh, hi!" });
      });
    });

    describe("/authenticate/:driver", () => {
      it("should return json from authenticateCtrl.getAuthenticationProcess", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const authenticateCtrl = {
          getAuthenticationProcess: jest
            .fn()
            .mockReturnValue(Promise.resolve({ foo: "bar" }))
        };
        const eventCtrl = {};
        const driverCtrl = {};
        const interfaceCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(
          app.get.mock.calls[callbackGetIndexes.getAuthenticationProcess][0]
        ).toEqual("/authenticate/:driver");
        const callback =
          app.get.mock.calls[callbackGetIndexes.getAuthenticationProcess][1];
        expect(typeof callback).toEqual("function");
        const req = {
          params: {
            driver: "driverId"
          }
        };
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(authenticateCtrl.getAuthenticationProcess).toHaveBeenCalledWith(
          req.params.driver,
          drivers
        );
        expect(res.json).toHaveBeenCalledWith({ foo: "bar" });
        expect(next).toHaveBeenCalledTimes(0);
      });

      it("should catch any errors and pass them to the next callback", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const authenticateCtrl = {
          getAuthenticationProcess: jest
            .fn()
            .mockReturnValue(Promise.reject({ foo: "bar" }))
        };
        const eventCtrl = {};
        const driverCtrl = {};
        const interfaceCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(
          app.get.mock.calls[callbackGetIndexes.getAuthenticationProcess][0]
        ).toEqual("/authenticate/:driver");
        const callback =
          app.get.mock.calls[callbackGetIndexes.getAuthenticationProcess][1];
        expect(typeof callback).toEqual("function");
        const req = {
          params: {
            driver: "driverId"
          }
        };
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(res.json).toHaveBeenCalledTimes(0);
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith({ foo: "bar" });
      });
    });

    describe("/authenticate/:driver/:stepId", () => {
      it("should return json from authenticateCtrl.authenticationStep", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const authenticateCtrl = {
          authenticationStep: jest
            .fn()
            .mockReturnValue(Promise.resolve({ foo: "bar" }))
        };
        const eventCtrl = {};
        const driverCtrl = {};
        const interfaceCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(
          app.post.mock.calls[callbackPostIndexes.authenticationStep][0]
        ).toEqual("/authenticate/:driver/:stepId");
        const callback =
          app.post.mock.calls[callbackPostIndexes.authenticationStep][2];
        expect(typeof callback).toEqual("function");
        const req = {
          params: {
            driver: "driverId",
            stepId: "stepId"
          },
          body: "body"
        };
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(authenticateCtrl.authenticationStep).toHaveBeenCalledWith(
          req.params.driver,
          req.params.stepId,
          req.body
        );
        expect(res.json).toHaveBeenCalledWith({ foo: "bar" });
        expect(next).toHaveBeenCalledTimes(0);
      });

      it("should catch any errors and pass them to the next callback", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const authenticateCtrl = {
          authenticationStep: jest
            .fn()
            .mockReturnValue(Promise.reject({ foo: "bar" }))
        };
        const eventCtrl = {};
        const driverCtrl = {};
        const interfaceCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(
          app.post.mock.calls[callbackPostIndexes.authenticationStep][0]
        ).toEqual("/authenticate/:driver/:stepId");
        const callback =
          app.post.mock.calls[callbackPostIndexes.authenticationStep][2];
        expect(typeof callback).toEqual("function");
        const req = {
          params: {
            driver: "driverId",
            stepId: "stepId"
          },
          body: "body"
        };
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(res.json).toHaveBeenCalledTimes(0);
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith({ foo: "bar" });
      });
    });

    describe("/discover/:driver", () => {
      it("should return json from driverCtrl.discover", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const authenticateCtrl = {};
        const driverCtrl = {
          discover: jest.fn().mockReturnValue(Promise.resolve({ foo: "bar" }))
        };
        const interfaceCtrl = {};
        const eventCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(
          app.get.mock.calls[callbackGetIndexes.discoverDevices][0]
        ).toEqual("/discover/:driver");
        const callback =
          app.get.mock.calls[callbackGetIndexes.discoverDevices][1];
        expect(typeof callback).toEqual("function");
        const req = {
          params: {
            driver: "driverId"
          }
        };
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(driverCtrl.discover).toHaveBeenCalledWith(
          req.params.driver,
          drivers
        );
        expect(res.json).toHaveBeenCalledWith({ foo: "bar" });
        expect(next).toHaveBeenCalledTimes(0);
      });

      it("should catch any errors and pass them to the next callback", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const driverCtrl = {
          discover: jest.fn().mockReturnValue(Promise.reject({ foo: "bar" }))
        };
        const interfaceCtrl = {};
        const eventCtrl = {};
        const authenticateCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(
          app.get.mock.calls[callbackGetIndexes.discoverDevices][0]
        ).toEqual("/discover/:driver");
        const callback =
          app.get.mock.calls[callbackGetIndexes.discoverDevices][1];
        expect(typeof callback).toEqual("function");
        const req = {
          params: {
            driver: "driverId"
          }
        };
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(res.json).toHaveBeenCalledTimes(0);
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith({ foo: "bar" });
      });
    });

    describe("/devices", () => {
      it("should return json from driverCtrl.getAllDevices", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const authenticateCtrl = {};
        const driverCtrl = {
          getAllDevices: jest
            .fn()
            .mockReturnValue(Promise.resolve({ foo: "bar" }))
        };
        const interfaceCtrl = {};
        const eventCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(app.get.mock.calls[callbackGetIndexes.getDevices][0]).toEqual(
          "/devices"
        );
        const callback = app.get.mock.calls[callbackGetIndexes.getDevices][1];
        expect(typeof callback).toEqual("function");
        const req = {};
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(driverCtrl.getAllDevices).toHaveBeenCalledWith();
        expect(res.json).toHaveBeenCalledWith({ foo: "bar" });
        expect(next).toHaveBeenCalledTimes(0);
      });

      it("should catch any errors and pass them to the next callback", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const driverCtrl = {
          getAllDevices: jest
            .fn()
            .mockReturnValue(Promise.reject({ foo: "bar" }))
        };
        const interfaceCtrl = {};
        const eventCtrl = {};
        const authenticateCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(app.get.mock.calls[callbackGetIndexes.getDevices][0]).toEqual(
          "/devices"
        );
        const callback = app.get.mock.calls[callbackGetIndexes.getDevices][1];
        expect(typeof callback).toEqual("function");
        const req = {};
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(res.json).toHaveBeenCalledTimes(0);
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith({ foo: "bar" });
      });
    });

    describe("/devices/type/:type", () => {
      it("should return json from driverCtrl.getDevicesByType", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const authenticateCtrl = {};
        const driverCtrl = {
          getDevicesByType: jest
            .fn()
            .mockReturnValue(Promise.resolve({ foo: "bar" }))
        };
        const interfaceCtrl = {};
        const eventCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(
          app.get.mock.calls[callbackGetIndexes.getDevicesByType][0]
        ).toEqual("/devices/type/:type");
        const callback =
          app.get.mock.calls[callbackGetIndexes.getDevicesByType][1];
        expect(typeof callback).toEqual("function");
        const req = {
          params: {
            type: "type"
          }
        };
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(driverCtrl.getDevicesByType).toHaveBeenCalledWith("type");
        expect(res.json).toHaveBeenCalledWith({ foo: "bar" });
        expect(next).toHaveBeenCalledTimes(0);
      });

      it("should catch any errors and pass them to the next callback", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const driverCtrl = {
          getDevicesByType: jest
            .fn()
            .mockReturnValue(Promise.reject({ foo: "bar" }))
        };
        const interfaceCtrl = {};
        const eventCtrl = {};
        const authenticateCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(
          app.get.mock.calls[callbackGetIndexes.getDevicesByType][0]
        ).toEqual("/devices/type/:type");
        const callback =
          app.get.mock.calls[callbackGetIndexes.getDevicesByType][1];
        expect(typeof callback).toEqual("function");
        const req = {
          params: {
            type: "type"
          }
        };
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(res.json).toHaveBeenCalledTimes(0);
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith({ foo: "bar" });
      });
    });

    describe("/devices/driver/:driver", () => {
      it("should return json from driverCtrl.getDevicesByDriver", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const authenticateCtrl = {};
        const driverCtrl = {
          getDevicesByDriver: jest
            .fn()
            .mockReturnValue(Promise.resolve({ foo: "bar" }))
        };
        const interfaceCtrl = {};
        const eventCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(
          app.get.mock.calls[callbackGetIndexes.getDevicesByDriver][0]
        ).toEqual("/devices/driver/:driver");
        const callback =
          app.get.mock.calls[callbackGetIndexes.getDevicesByDriver][1];
        expect(typeof callback).toEqual("function");
        const req = {
          params: {
            driver: "driverId"
          }
        };
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(driverCtrl.getDevicesByDriver).toHaveBeenCalledWith("driverId");
        expect(res.json).toHaveBeenCalledWith({ foo: "bar" });
        expect(next).toHaveBeenCalledTimes(0);
      });

      it("should catch any errors and pass them to the next callback", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const driverCtrl = {
          getDevicesByDriver: jest
            .fn()
            .mockReturnValue(Promise.reject({ foo: "bar" }))
        };
        const interfaceCtrl = {};
        const eventCtrl = {};
        const authenticateCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(
          app.get.mock.calls[callbackGetIndexes.getDevicesByDriver][0]
        ).toEqual("/devices/driver/:driver");
        const callback =
          app.get.mock.calls[callbackGetIndexes.getDevicesByDriver][1];
        expect(typeof callback).toEqual("function");
        const req = {
          params: {
            driver: "driverId"
          }
        };
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(res.json).toHaveBeenCalledTimes(0);
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith({ foo: "bar" });
      });
    });

    describe("/device/:deviceId", () => {
      it("should return json from driverCtrl.getDeviceById", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const authenticateCtrl = {};
        const driverCtrl = {
          getDeviceById: jest
            .fn()
            .mockReturnValue(Promise.resolve({ foo: "bar" }))
        };
        const interfaceCtrl = {};
        const eventCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(app.get.mock.calls[callbackGetIndexes.getDeviceById][0]).toEqual(
          "/device/:deviceId"
        );
        const callback =
          app.get.mock.calls[callbackGetIndexes.getDeviceById][1];
        expect(typeof callback).toEqual("function");
        const req = {
          params: {
            deviceId: "deviceId"
          }
        };
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(driverCtrl.getDeviceById).toHaveBeenCalledWith("deviceId");
        expect(res.json).toHaveBeenCalledWith({ foo: "bar" });
        expect(next).toHaveBeenCalledTimes(0);
      });

      it("should catch any errors and pass them to the next callback", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const driverCtrl = {
          getDeviceById: jest
            .fn()
            .mockReturnValue(Promise.reject({ foo: "bar" }))
        };
        const interfaceCtrl = {};
        const eventCtrl = {};
        const authenticateCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(app.get.mock.calls[callbackGetIndexes.getDeviceById][0]).toEqual(
          "/device/:deviceId"
        );
        const callback =
          app.get.mock.calls[callbackGetIndexes.getDeviceById][1];
        expect(typeof callback).toEqual("function");
        const req = {
          params: {
            deviceId: "deviceId"
          }
        };
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(res.json).toHaveBeenCalledTimes(0);
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith({ foo: "bar" });
      });
    });

    describe("/driver/:driverId/pairingInstructions", () => {
      it("should return json from driverCtrl.getDriverPairingInstructions", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const authenticateCtrl = {};
        const driverCtrl = {
          getDriverPairingInstructions: jest
            .fn()
            .mockReturnValue(Promise.resolve({ foo: "bar" }))
        };
        const interfaceCtrl = {};
        const eventCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(
          app.get.mock.calls[callbackGetIndexes.getDriverPairingInstructions][0]
        ).toEqual("/driver/:driverId/pairingInstructions");
        const callback =
          app.get.mock.calls[
            callbackGetIndexes.getDriverPairingInstructions
          ][1];
        expect(typeof callback).toEqual("function");
        const req = {
          params: {
            driverId: "driverId"
          }
        };
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(driverCtrl.getDriverPairingInstructions).toHaveBeenCalledWith(
          "driverId"
        );
        expect(res.json).toHaveBeenCalledWith({ foo: "bar" });
        expect(next).toHaveBeenCalledTimes(0);
      });

      describe("/device/:deviceId/failedRemovalInstructions", () => {
        it("should return json from driverCtrl.getDeviceFailedRemovalInstructions", async () => {
          const bodyParser = {
            json: jest.fn()
          };
          const authenticateCtrl = {};
          const driverCtrl = {
            getDeviceFailedRemovalInstructions: jest
              .fn()
              .mockReturnValue(Promise.resolve({ foo: "bar" }))
          };
          const interfaceCtrl = {};
          const eventCtrl = {};
          const app = {
            get: jest.fn(),
            post: jest.fn(),
            use: jest.fn()
          };
          const drivers = {};
          httpApiModule(
            bodyParser,
            authenticateCtrl,
            eventCtrl,
            driverCtrl,
            interfaceCtrl,
            app,
            drivers
          );
          expect(
            app.get.mock.calls[
              callbackGetIndexes.getDeviceFailedRemovalInstructions
            ][0]
          ).toEqual("/device/:deviceId/failedRemovalInstructions");
          const callback =
            app.get.mock.calls[
              callbackGetIndexes.getDeviceFailedRemovalInstructions
            ][1];
          expect(typeof callback).toEqual("function");
          const req = {
            params: {
              deviceId: "deviceId"
            }
          };
          const res = {
            json: jest.fn()
          };
          const next = jest.fn();
          await callback(req, res, next);
          expect(
            driverCtrl.getDeviceFailedRemovalInstructions
          ).toHaveBeenCalledWith("deviceId");
          expect(res.json).toHaveBeenCalledWith({ foo: "bar" });
          expect(next).toHaveBeenCalledTimes(0);
        });

        it("should catch any errors and pass them to the next callback", async () => {
          const bodyParser = {
            json: jest.fn()
          };
          const driverCtrl = {
            getDeviceFailedRemovalInstructions: jest
              .fn()
              .mockReturnValue(Promise.reject({ foo: "bar" }))
          };
          const interfaceCtrl = {};
          const eventCtrl = {};
          const authenticateCtrl = {};
          const app = {
            get: jest.fn(),
            post: jest.fn(),
            use: jest.fn()
          };
          const drivers = {};
          httpApiModule(
            bodyParser,
            authenticateCtrl,
            eventCtrl,
            driverCtrl,
            interfaceCtrl,
            app,
            drivers
          );
          expect(
            app.get.mock.calls[
              callbackGetIndexes.getDeviceFailedRemovalInstructions
            ][0]
          ).toEqual("/device/:deviceId/failedRemovalInstructions");
          const callback =
            app.get.mock.calls[
              callbackGetIndexes.getDeviceFailedRemovalInstructions
            ][1];
          expect(typeof callback).toEqual("function");
          const req = {
            params: {
              deviceId: "deviceId"
            }
          };
          const res = {
            json: jest.fn()
          };
          const next = jest.fn();
          await callback(req, res, next);
          expect(res.json).toHaveBeenCalledTimes(0);
          expect(next).toHaveBeenCalledTimes(1);
          expect(next).toHaveBeenCalledWith({ foo: "bar" });
        });
      });
      it("should catch any errors and pass them to the next callback", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const driverCtrl = {
          getDriverPairingInstructions: jest
            .fn()
            .mockReturnValue(Promise.reject({ foo: "bar" }))
        };
        const interfaceCtrl = {};
        const eventCtrl = {};
        const authenticateCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(
          app.get.mock.calls[callbackGetIndexes.getDriverPairingInstructions][0]
        ).toEqual("/driver/:driverId/pairingInstructions");
        const callback =
          app.get.mock.calls[
            callbackGetIndexes.getDriverPairingInstructions
          ][1];
        expect(typeof callback).toEqual("function");
        const req = {
          params: {
            driverId: "driverId"
          }
        };
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(res.json).toHaveBeenCalledTimes(0);
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith({ foo: "bar" });
      });
    });

    describe("/device/:deviceId/runCommand", () => {
      it("should return json from driverCtrl.runCommand", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const authenticateCtrl = {};
        const driverCtrl = {
          runCommand: jest.fn().mockReturnValue(Promise.resolve({ foo: "bar" }))
        };
        const interfaceCtrl = {};
        const eventCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(app.post.mock.calls[callbackPostIndexes.runCommand][0]).toEqual(
          "/device/:deviceId/:command"
        );
        const callback = app.post.mock.calls[callbackPostIndexes.runCommand][2];
        expect(typeof callback).toEqual("function");
        const req = {
          params: {
            deviceId: "deviceId",
            command: "command"
          },
          body: "body"
        };
        const res = {
          send: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(driverCtrl.runCommand).toHaveBeenCalledWith(
          req.params.deviceId,
          req.params.command,
          req.body,
          drivers
        );
        expect(res.send).toHaveBeenCalledWith();
        expect(next).toHaveBeenCalledTimes(0);
      });

      it("should catch any errors and pass them to the next callback", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const driverCtrl = {
          runCommand: jest.fn().mockReturnValue(Promise.reject({ foo: "bar" }))
        };
        const interfaceCtrl = {};
        const eventCtrl = {};
        const authenticateCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(app.post.mock.calls[callbackPostIndexes.runCommand][0]).toEqual(
          "/device/:deviceId/:command"
        );
        const callback = app.post.mock.calls[callbackPostIndexes.runCommand][2];
        expect(typeof callback).toEqual("function");
        const req = {
          params: {
            deviceId: "deviceId",
            command: "command"
          },
          body: "body"
        };
        const res = {
          send: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(res.send).toHaveBeenCalledTimes(0);
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith({ foo: "bar" });
      });
    });

    describe("/removeDevice/:deviceId", () => {
      it("should return json from driverCtrl.removeDevice", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const authenticateCtrl = {};
        const driverCtrl = {
          removeDevice: jest
            .fn()
            .mockReturnValue(Promise.resolve({ foo: "bar" }))
        };
        const interfaceCtrl = {};
        const eventCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(
          app.post.mock.calls[callbackPostIndexes.removeDevice][0]
        ).toEqual("/removeDevice/:deviceId");
        const callback =
          app.post.mock.calls[callbackPostIndexes.removeDevice][2];
        expect(typeof callback).toEqual("function");
        const req = {
          params: {
            deviceId: "deviceId"
          }
        };
        const res = {
          send: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(driverCtrl.removeDevice).toHaveBeenCalledWith(
          req.params.deviceId
        );
        expect(res.send).toHaveBeenCalledWith();
        expect(next).toHaveBeenCalledTimes(0);
      });

      it("should catch any errors and pass them to the next callback", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const driverCtrl = {
          removeDevice: jest
            .fn()
            .mockReturnValue(Promise.reject({ foo: "bar" }))
        };
        const interfaceCtrl = {};
        const eventCtrl = {};
        const authenticateCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(
          app.post.mock.calls[callbackPostIndexes.removeDevice][0]
        ).toEqual("/removeDevice/:deviceId");
        const callback =
          app.post.mock.calls[callbackPostIndexes.removeDevice][2];
        expect(typeof callback).toEqual("function");
        const req = {
          params: {
            deviceId: "deviceId"
          }
        };
        const res = {
          send: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(res.send).toHaveBeenCalledTimes(0);
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith({ foo: "bar" });
      });
    });

    describe("/drivers", () => {
      it("should return json from driverCtrl.getDriversWithStats", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const authenticateCtrl = {};
        const driverCtrl = {
          getDriversWithStats: jest
            .fn()
            .mockReturnValue(Promise.resolve({ foo: "bar" }))
        };
        const interfaceCtrl = {};
        const eventCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(app.get.mock.calls[callbackGetIndexes.getDrivers][0]).toEqual(
          "/drivers"
        );
        const callback = app.get.mock.calls[callbackGetIndexes.getDrivers][1];
        expect(typeof callback).toEqual("function");
        const req = {};
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(driverCtrl.getDriversWithStats).toHaveBeenCalledWith(drivers);
        expect(res.json).toHaveBeenCalledWith({ foo: "bar" });
        expect(next).toHaveBeenCalledTimes(0);
      });

      it("should catch any errors and pass them to the next callback", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const driverCtrl = {
          getDriversWithStats: jest
            .fn()
            .mockReturnValue(Promise.reject({ foo: "bar" }))
        };
        const interfaceCtrl = {};
        const eventCtrl = {};
        const authenticateCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(app.get.mock.calls[callbackGetIndexes.getDrivers][0]).toEqual(
          "/drivers"
        );
        const callback = app.get.mock.calls[callbackGetIndexes.getDrivers][1];
        expect(typeof callback).toEqual("function");
        const req = {};
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(res.json).toHaveBeenCalledTimes(0);
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith({ foo: "bar" });
      });
    });

    describe("/drivers/commands", () => {
      it("should return json from driverCtrl.getCommands", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const authenticateCtrl = {};
        const driverCtrl = {
          getCommands: jest
            .fn()
            .mockReturnValue(Promise.resolve({ foo: "bar" }))
        };
        const interfaceCtrl = {};
        const eventCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(app.get.mock.calls[callbackGetIndexes.getCommands][0]).toEqual(
          "/drivers/commands"
        );
        const callback = app.get.mock.calls[callbackGetIndexes.getCommands][1];
        expect(typeof callback).toEqual("function");
        const req = {};
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(driverCtrl.getCommands).toHaveBeenCalledWith();
        expect(res.json).toHaveBeenCalledWith({ foo: "bar" });
        expect(next).toHaveBeenCalledTimes(0);
      });

      it("should catch any errors and pass them to the next callback", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const driverCtrl = {
          getCommands: jest.fn().mockReturnValue(Promise.reject({ foo: "bar" }))
        };
        const interfaceCtrl = {};
        const eventCtrl = {};
        const authenticateCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(app.get.mock.calls[callbackGetIndexes.getCommands][0]).toEqual(
          "/drivers/commands"
        );
        const callback = app.get.mock.calls[callbackGetIndexes.getCommands][1];
        expect(typeof callback).toEqual("function");
        const req = {};
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(res.json).toHaveBeenCalledTimes(0);
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith({ foo: "bar" });
      });
    });

    describe("/drivers/events", () => {
      it("should return json from driverCtrl.getEventDescriptions", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const authenticateCtrl = {};
        const driverCtrl = {
          getEventDescriptions: jest
            .fn()
            .mockReturnValue(Promise.resolve({ foo: "bar" }))
        };
        const interfaceCtrl = {};
        const eventCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(
          app.get.mock.calls[callbackGetIndexes.getEventDescriptions][0]
        ).toEqual("/drivers/events");
        const callback =
          app.get.mock.calls[callbackGetIndexes.getEventDescriptions][1];
        expect(typeof callback).toEqual("function");
        const req = {};
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(driverCtrl.getEventDescriptions).toHaveBeenCalledWith();
        expect(res.json).toHaveBeenCalledWith({ foo: "bar" });
        expect(next).toHaveBeenCalledTimes(0);
      });

      it("should catch any errors and pass them to the next callback", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const driverCtrl = {
          getEventDescriptions: jest
            .fn()
            .mockReturnValue(Promise.reject({ foo: "bar" }))
        };
        const interfaceCtrl = {};
        const eventCtrl = {};
        const authenticateCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(
          app.get.mock.calls[callbackGetIndexes.getEventDescriptions][0]
        ).toEqual("/drivers/events");
        const callback =
          app.get.mock.calls[callbackGetIndexes.getEventDescriptions][1];
        expect(typeof callback).toEqual("function");
        const req = {};
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(res.json).toHaveBeenCalledTimes(0);
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith({ foo: "bar" });
      });
    });

    describe("/event/latestCommands", () => {
      it("should return json from eventCtrl.getLatestCommandEvents", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const authenticateCtrl = {};
        const eventCtrl = {
          getLatestCommandEvents: jest
            .fn()
            .mockReturnValue(Promise.resolve({ foo: "bar" }))
        };
        const driverCtrl = {};
        const interfaceCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(
          app.get.mock.calls[callbackGetIndexes.getLatestCommandEvents][0]
        ).toEqual("/event/latestCommands");
        const callback =
          app.get.mock.calls[callbackGetIndexes.getLatestCommandEvents][1];
        expect(typeof callback).toEqual("function");
        const req = {};
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(eventCtrl.getLatestCommandEvents).toHaveBeenCalledWith();
        expect(res.json).toHaveBeenCalledWith({ foo: "bar" });
        expect(next).toHaveBeenCalledTimes(0);
      });

      it("should catch any errors and pass them to the next callback", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const eventCtrl = {
          getLatestCommandEvents: jest
            .fn()
            .mockReturnValue(Promise.reject({ foo: "bar" }))
        };
        const driverCtrl = {};
        const interfaceCtrl = {};
        const authenticateCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(
          app.get.mock.calls[callbackGetIndexes.getLatestCommandEvents][0]
        ).toEqual("/event/latestCommands");
        const callback =
          app.get.mock.calls[callbackGetIndexes.getLatestCommandEvents][1];
        expect(typeof callback).toEqual("function");
        const req = {};
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(res.json).toHaveBeenCalledTimes(0);
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith({ foo: "bar" });
      });
    });

    describe("/event/:eventType", () => {
      it("should return json from eventCtrl.getEventsByType", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const authenticateCtrl = {};
        const eventCtrl = {
          getEventsByType: jest
            .fn()
            .mockReturnValue(Promise.resolve({ foo: "bar" }))
        };
        const driverCtrl = {};
        const interfaceCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(
          app.get.mock.calls[callbackGetIndexes.getEventsByType][0]
        ).toEqual("/event/:eventType");
        const callback =
          app.get.mock.calls[callbackGetIndexes.getEventsByType][1];
        expect(typeof callback).toEqual("function");
        const req = {
          params: {
            eventType: "eventType"
          },
          query: {
            from: "from"
          }
        };
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(eventCtrl.getEventsByType).toHaveBeenCalledWith(
          req.params.eventType,
          req.query.from
        );
        expect(res.json).toHaveBeenCalledWith({ foo: "bar" });
        expect(next).toHaveBeenCalledTimes(0);
      });

      it("should catch any errors and pass them to the next callback", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const eventCtrl = {
          getEventsByType: jest
            .fn()
            .mockReturnValue(Promise.reject({ foo: "bar" }))
        };
        const driverCtrl = {};
        const interfaceCtrl = {};
        const authenticateCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(
          app.get.mock.calls[callbackGetIndexes.getEventsByType][0]
        ).toEqual("/event/:eventType");
        const callback =
          app.get.mock.calls[callbackGetIndexes.getEventsByType][1];
        expect(typeof callback).toEqual("function");
        const req = {
          params: {
            eventType: "eventType"
          },
          query: {
            from: "from"
          }
        };
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(res.json).toHaveBeenCalledTimes(0);
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith({ foo: "bar" });
      });
    });

    describe("/pairingMode", () => {
      it("should return json from interfaceCtrl.pairingMode", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const authenticateCtrl = {};
        const eventCtrl = {};
        const driverCtrl = {};
        const interfaceCtrl = {
          pairingMode: jest.fn().mockReturnValue(Promise.resolve(4))
        };
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(app.get.mock.calls[callbackGetIndexes.pairingMode][0]).toEqual(
          "/pairingMode"
        );
        const callback = app.get.mock.calls[callbackGetIndexes.pairingMode][1];
        expect(typeof callback).toEqual("function");
        const req = {};
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(interfaceCtrl.pairingMode).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(4);
        expect(next).toHaveBeenCalledTimes(0);
      });

      it("should catch any errors and pass them to the next callback", async () => {
        const bodyParser = {
          json: jest.fn()
        };
        const eventCtrl = {};
        const driverCtrl = {};
        const interfaceCtrl = {
          pairingMode: jest.fn().mockReturnValue(Promise.reject(0))
        };
        const authenticateCtrl = {};
        const app = {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn()
        };
        const drivers = {};
        httpApiModule(
          bodyParser,
          authenticateCtrl,
          eventCtrl,
          driverCtrl,
          interfaceCtrl,
          app,
          drivers
        );
        expect(app.get.mock.calls[callbackGetIndexes.pairingMode][0]).toEqual(
          "/pairingMode"
        );
        const callback = app.get.mock.calls[callbackGetIndexes.pairingMode][1];
        expect(typeof callback).toEqual("function");
        const req = {};
        const res = {
          json: jest.fn()
        };
        const next = jest.fn();
        await callback(req, res, next);
        expect(res.json).toHaveBeenCalledTimes(0);
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(0);
      });
    });
  });
});
