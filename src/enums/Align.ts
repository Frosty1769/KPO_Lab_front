export enum AlignType{
    LawfulGood ='lawful_good',
    NeutralGood ='neutral_good',
    ChaoticGood ='chaotic_good',
    LawfulNeutral ='lawful_neutral',
    TrueNeutral = 'true_neutral',
    ChaoticNeutral ='chaotic_neutral',
    LawfulEvil ='lawful_evil',
    NeutralEvil ='neutral_evil',
    ChaoticEvil ='chaotic_evil',
}

export const AlignTitles: Record<AlignType, string> = {
	[AlignType.LawfulGood]: 'Законно-добрый',
	[AlignType.NeutralGood]: 'Добрый',
	[AlignType.ChaoticGood]: 'Хаотично-добрый',
	[AlignType.LawfulNeutral]: 'Законопослушный',
	[AlignType.TrueNeutral]: 'Истинно нейтральный',
	[AlignType.ChaoticNeutral]: 'Хаотичный',
	[AlignType.LawfulEvil]: 'Законно-злой',
	[AlignType.NeutralEvil]: 'Злой',
	[AlignType.ChaoticEvil]: 'Хаотично-злой',
};

export interface AlignItem {
	value: AlignType;
	label: string;
}

export const AlignTypeList: AlignItem[] = [
	{ value: AlignType.LawfulGood, label: AlignTitles[AlignType.LawfulGood] },
	{ value: AlignType.NeutralGood, label: AlignTitles[AlignType.NeutralGood] },
	{ value: AlignType.ChaoticGood, label: AlignTitles[AlignType.ChaoticGood] },
	{ value: AlignType.LawfulNeutral, label: AlignTitles[AlignType.LawfulNeutral] },
	{ value: AlignType.TrueNeutral, label: AlignTitles[AlignType.TrueNeutral] },
	{ value: AlignType.ChaoticNeutral, label: AlignTitles[AlignType.ChaoticNeutral] },
	{ value: AlignType.LawfulEvil, label: AlignTitles[AlignType.LawfulEvil] },
	{ value: AlignType.NeutralEvil, label: AlignTitles[AlignType.NeutralEvil] },
	{ value: AlignType.ChaoticEvil, label: AlignTitles[AlignType.ChaoticEvil] },
];