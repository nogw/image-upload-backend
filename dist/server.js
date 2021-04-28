"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var express_1 = __importStar(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var morgan_1 = __importDefault(require("morgan"));
var config = __importStar(require("./config"));
var cors_1 = __importDefault(require("cors"));
var image_router_1 = __importDefault(require("./image.router"));
dotenv_1.default.config();
var app = express_1.default();
var port = process.env.PORT || 8000;
var URI = process.env.MONGO_URI;
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(morgan_1.default("dev"));
app.use(express_1.urlencoded({ extended: true }));
app.use(express_1.default.static(config.uploadDir));
app.use("/", image_router_1.default);
mongoose_1.default.connect(URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
var db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () { return console.log("database connected"); });
app.listen(port, function () {
    console.log("listen in " + port);
});
