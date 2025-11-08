export enum ClassType{
    Barbarian ='barbarian',
    Bard ='bard',
    Cleric ='cleric',
    Druid ='druid',
    Fighter = 'fighter',
    Monk ='monk',
    Paladin ='paladin',
    Ranger ='ranger',
    Rogue ='rogue',
    Sorcerer ='sorcerer',
    Warlock ='warlock',
    Wizard ='wizard',
}

export const ClassTitles: Record<ClassType, string> = {
	[ClassType.Barbarian]: 'Варвар',
	[ClassType.Bard]: 'Бард',
	[ClassType.Cleric]: 'Жрец',
	[ClassType.Druid]: 'Друид',
	[ClassType.Fighter]: 'Воин',
	[ClassType.Monk]: 'Монах',
	[ClassType.Paladin]: 'Паладин',
	[ClassType.Ranger]: 'Следопыт',
	[ClassType.Rogue]: 'Плут',
	[ClassType.Sorcerer]: 'Чародей',
	[ClassType.Warlock]: 'Колдун',
	[ClassType.Wizard]: 'Волшебник',
};

export interface ClassItem {
	value: ClassType;
	label: string;
}

export const ClassTypeList: ClassItem[] = [
	{ value: ClassType.Barbarian, label: ClassTitles[ClassType.Barbarian] },
	{ value: ClassType.Bard, label: ClassTitles[ClassType.Bard] },
	{ value: ClassType.Cleric, label: ClassTitles[ClassType.Cleric] },
	{ value: ClassType.Druid, label: ClassTitles[ClassType.Druid] },
	{ value: ClassType.Fighter, label: ClassTitles[ClassType.Fighter] },
	{ value: ClassType.Monk, label: ClassTitles[ClassType.Monk] },
	{ value: ClassType.Paladin, label: ClassTitles[ClassType.Paladin] },
	{ value: ClassType.Ranger, label: ClassTitles[ClassType.Ranger] },
	{ value: ClassType.Rogue, label: ClassTitles[ClassType.Rogue] },
	{ value: ClassType.Sorcerer, label: ClassTitles[ClassType.Sorcerer] },
	{ value: ClassType.Warlock, label: ClassTitles[ClassType.Warlock] },
	{ value: ClassType.Wizard, label: ClassTitles[ClassType.Wizard] },
];