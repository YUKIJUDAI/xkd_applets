import dayjs from "dayjs";

import crypto from "crypto";

export const changeDay = (val: number, gs: string = "YYYY-MM-DD HH:mm") => {
    return dayjs(val).format(gs);
};

export const decrypt = (encryptedData, sessionKey, iv) => {
    const decipher = crypto.createDecipheriv(
        "aes-128-cbc",
        Buffer.from(sessionKey, "base64"),
        Buffer.from(iv, "base64")
    );

    let ret: any = decipher.update(encryptedData, "base64");
    ret += decipher.final();
    return JSON.parse(ret);
};

export const compareVersionEle = (currVersion, targetVerison) => {
    if (!currVersion || !targetVerison) return false;
    const curr = currVersion.split(".");
    const target = targetVerison.split(".");
    for (let i = 0; i < curr.length; i++) {
        if (parseInt(curr[i]) > parseInt(target[i])) {
            return true;
        }
        if (parseInt(curr[i]) < parseInt(target[i])) {
            return false;
        }
    }
    return true;
};
