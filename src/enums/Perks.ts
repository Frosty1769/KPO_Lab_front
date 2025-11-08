export enum PerkType{
    Acrobatics = 'acrobatics',
    Animal_handling = 'animal_handling',
    Arcana = 'arcana',
    Athletics = 'athletics',
    Deception = 'deception',
    History = 'history',
    Insight = 'insight',
    Intimidation = 'intimidation',
    Investigation = 'investigation',
    Medicine = 'medicine',
    Nature = 'nature',
    Perception = 'perception',
    Performance = 'performance',
    Persuasion = 'persuasion',
    Religion = 'religion',
    Sleight_of_hand = 'sleight_of_hand',
    Stealth = 'stealth',
    Survival = 'survival',

}

export const PerkTitles: Record<PerkType, string> = {
	[PerkType.Acrobatics]: 'Акробатика',
	[PerkType.Animal_handling]: 'Уход за животными',
	[PerkType.Arcana]: 'Магия',
	[PerkType.Athletics]: 'Атлетика',
	[PerkType.Deception]: 'Обман',
	[PerkType.History]: 'История',
	[PerkType.Insight]: 'Прорицительность',
	[PerkType.Intimidation]: 'Запугивание',
	[PerkType.Investigation]: 'Анализ',
	[PerkType.Medicine]: 'Медицина',
	[PerkType.Nature]: 'Природа',
	[PerkType.Perception]: 'Внимательность',
	[PerkType.Performance]: 'Выступление',
	[PerkType.Persuasion]: 'Убеждение',
	[PerkType.Religion]: 'Религия',
	[PerkType.Sleight_of_hand]: 'Ловкость рук',
	[PerkType.Stealth]: 'Скрытность',
	[PerkType.Survival]: 'Выживание',
};

export interface PerkItem {
	value: PerkType;
	label: string;
}

export const PerkList: PerkItem[] = [
	{ value: PerkType.Acrobatics, label: PerkTitles[PerkType.Acrobatics] },
	{ value: PerkType.Animal_handling, label: PerkTitles[PerkType.Animal_handling] },
	{ value: PerkType.Arcana, label: PerkTitles[PerkType.Arcana] },
	{ value: PerkType.Athletics, label: PerkTitles[PerkType.Athletics] },
	{ value: PerkType.Deception, label: PerkTitles[PerkType.Deception] },
	{ value: PerkType.History, label: PerkTitles[PerkType.History] },
	{ value: PerkType.Insight, label: PerkTitles[PerkType.Insight] },
	{ value: PerkType.Intimidation, label: PerkTitles[PerkType.Intimidation] },
	{ value: PerkType.Investigation, label: PerkTitles[PerkType.Investigation] },
	{ value: PerkType.Medicine, label: PerkTitles[PerkType.Medicine] },
	{ value: PerkType.Nature, label: PerkTitles[PerkType.Nature] },
	{ value: PerkType.Perception, label: PerkTitles[PerkType.Perception] },
	{ value: PerkType.Performance, label: PerkTitles[PerkType.Performance] },
	{ value: PerkType.Persuasion, label: PerkTitles[PerkType.Persuasion]},
	{ value: PerkType.Religion, label: PerkTitles[PerkType.Religion] },
	{ value: PerkType.Sleight_of_hand, label: PerkTitles[PerkType.Sleight_of_hand] },
	{ value: PerkType.Stealth, label: PerkTitles[PerkType.Stealth] },
	{ value: PerkType.Survival, label: PerkTitles[PerkType.Survival] },
];