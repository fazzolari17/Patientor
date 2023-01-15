"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeSet = exports.HealthCheckRating = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Other"] = "other";
})(Gender = exports.Gender || (exports.Gender = {}));
var HealthCheckRating;
(function (HealthCheckRating) {
    HealthCheckRating[HealthCheckRating["Healthy"] = 0] = "Healthy";
    HealthCheckRating[HealthCheckRating["LowRisk"] = 1] = "LowRisk";
    HealthCheckRating[HealthCheckRating["HighRick"] = 2] = "HighRick";
    HealthCheckRating[HealthCheckRating["CriticalRisk"] = 3] = "CriticalRisk";
})(HealthCheckRating = exports.HealthCheckRating || (exports.HealthCheckRating = {}));
var TypeSet;
(function (TypeSet) {
    TypeSet["Hospital"] = "Hospital";
    TypeSet["OccupationalHealthcare"] = "OccupationalHealthcare";
    TypeSet["HealthCheck"] = "HealthCheck";
})(TypeSet = exports.TypeSet || (exports.TypeSet = {}));
