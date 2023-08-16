import { Model } from "../models";

export const Auth = {
    create: async (data: UserDataObject) => {
        const newData = new Model.Users(data);

        const saveData = await newData.save();

        if (!saveData) {
            throw new Error("Database Error");
        }

        return saveData;
    },
    find: async (props: any) => {
        const { filter } = props;

        const result = await Model.Users.find(filter);

        return result;
    },
    update: async (props: any) => {
        const { filter } = props;

        const result = await Model.Users.updateOne(
            { filter },
            {
                status: "success",
                completedTimeStamp: Date.now(),
            }
        );

        return result;
    },
};
