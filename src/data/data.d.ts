export declare interface TestQuestions {
    unique_code: string; // id
    atype: string; // 1 最后一个，2 a的个数， 3 随机 , 4 分男女随机 5 选项多少
    resultList: Array<string>;
    enterImg: string;
    list: Array<{ q: string; a: Array<string>; i?: string }>; // 问题列表
}

export declare interface TestListType {
    id: string; // id
    unique_code: string;
    name: string;
    description: string;
    logo: string;
    hot: number;
    question_nums: number;
    [propsName: string]: any;
}
