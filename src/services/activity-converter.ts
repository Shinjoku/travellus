import type Activity from "../models/Place";

class ActivityConverter {
  static separatorCharacter: string = ",";

  static convertToCSV(activities: Activity[]): string {
    const csvKeys = Object.keys(activities[0]) as (keyof Activity)[];
    let csvStr = csvKeys.join(ActivityConverter.separatorCharacter) + "\n";

    csvStr += activities.map((activity) =>
      csvKeys
        .map((key) => activity[key])
        .join(ActivityConverter.separatorCharacter),
    );

    return csvStr;
  }

  static revertToArray(csvContent: string): Activity[] {
    const lines = csvContent.split(/\r?\n/);

    if (!lines || lines.length === 0) throw new Error("No records found");

    const validKeys: (keyof Activity)[] = [
      "type",
      "duration",
      "location",
      "name",
      "neighborhood",
      "price",
    ];

    const csvKeys = lines[0].split(
      ActivityConverter.separatorCharacter,
    ) as (keyof Activity)[];

    for (const csvKey of csvKeys)
      if (!validKeys.includes(csvKey))
        throw new Error(`Invalid column found: "${csvKey}"`);

    const activities: Activity[] = [];
    const dataRows = lines.slice(1);

    for (const line of dataRows) {
      const values = line.split(ActivityConverter.separatorCharacter);
      const obj: any = {};
      let key: keyof Activity;

      for (let i = 0; i < csvKeys.length; i++) {
        key = csvKeys[i];

        if (!values[i])
          throw new Error(
            `Invalid row found: row with no value for column "${key}"`,
          );

        obj[key] = values[i];
      }

      activities.push(obj as Activity);
    }

    return activities;
  }
}

export default ActivityConverter;
