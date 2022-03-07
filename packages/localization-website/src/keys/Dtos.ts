/**
 * TBD
 */
export interface ILocalizationKeyBase {
  id: string;
  categoryId: string;
}

/**
 * TBD
 */
export interface ILocalizationKeyText extends ILocalizationKeyBase {
  type: 'text';
  value: Record<string, string>;
}

/**
 * TBD
 */
export interface ILocalizationKeyImage extends ILocalizationKeyBase {
  type: 'image';
  value: Record<string, string>;
}

/**
 * TBD
 */
export type ILocalizationKey =
  | ILocalizationKeyText
  | ILocalizationKeyImage;

/**
 * TBD
 */
export type LocalizationKeyType = ILocalizationKey['type'];