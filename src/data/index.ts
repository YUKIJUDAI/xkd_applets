import { TestQuestions } from "./data.d";

import data10001 from "./10001.data.json";
import data10002 from "./10002.data.json";
import data10003 from "./10003.data.json";
import data10004 from "./10004.data.json";
import data10005 from "./10005.data.json";
import data10006 from "./10006.data.json";
import data10007 from "./10007.data.json";
import data10008 from "./10008.data.json";
import data10009 from "./10009.data.json";
import data10010 from "./10010.data.json";

const data = {
    10001: data10001,
    10002: data10002,
    10003: data10003,
    10004: data10004,
    10005: data10005,
    10006: data10006,
    10007: data10007,
    10008: data10008,
    10009: data10009,
    10010: data10010,
};

// 根据ID获取题目
export const getQuestion = (id: number | string): TestQuestions => {
    return data[id];
};
