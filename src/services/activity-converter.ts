import type { UUID } from "node:crypto";
import timestring from "timestring";

import type Activity from "../models/Activity";
import type { ActivityType } from "@/models/ActivityType";

class ActivityConverter {
  static separatorCharacter: string = ";";

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
      "id",
      "type",
      "duration",
      "location",
      "name",
      "neighborhood",
      "price",
    ];

    const validTypes: ActivityType[] = [
      "Restaurant",
      "Beach",
      "Landmark",
      "Spot",
    ];

    function isValidKey(key: string): key is keyof Activity {
      return validKeys.includes(key as keyof Activity);
    }

    function isValidType(type: string): type is ActivityType {
      return validTypes.includes(type as ActivityType);
    }

    const csvKeys = lines[0].split(
      ActivityConverter.separatorCharacter,
    ) as (keyof Activity)[];

    for (const validKey of validKeys)
      if (!csvKeys.includes(validKey))
        throw new Error(`Couldn't find expected column "${validKey}"`);

    const activities: Activity[] = [];
    const dataRows = lines.slice(1);

    for (const line of dataRows) {
      const values = line.split(ActivityConverter.separatorCharacter);
      const obj = {} as Record<keyof Activity, string>;

      for (let i = 0; i < csvKeys.length; i++) {
        const key = csvKeys[i];

        if (!isValidKey(key)) continue;

        if (!values[i])
          throw new Error(
            `Invalid row found: row with no value for column "${key}"`,
          );

        obj[key] = values[i];
      }

      if (!isValidType(obj.type))
        throw new Error(`Invalid activity type "${obj.type}"`);

      try {
        activities.push({
          ...obj,
          id: obj.id as UUID,
          type: obj.type as ActivityType,
          duration: timestring(obj.duration, "m"),
          price: parseFloat(obj.price),
        });
      } catch (err) {
        console.error("Failed to parse CSV", err);
        throw new Error("Invalid format in duration or price");
      }
    }

    return activities;
  }
}

export default ActivityConverter;
