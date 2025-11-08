export enum RaceType{
    Gnome ='gnome',
    Dwarf ='dwarf',
    Dragonborn ='dragonborn',
    HalfOrk ='halfork',
    Halfling = 'halfling',
    HalfElf ='halfelf',
    Tiefling ='tiefling',
    Human ='human',
    Elf ='elf',
}

export const RaceTitles: Record<RaceType, string> = {
	[RaceType.Gnome]: 'Гном',
	[RaceType.Dwarf]: 'Дварф',
	[RaceType.Dragonborn]: 'Драконорожденный',
	[RaceType.HalfOrk]: 'Полуорк',
	[RaceType.Halfling]: 'Полурослик',
	[RaceType.HalfElf]: 'Полуэльф',
	[RaceType.Tiefling]: 'Тифлинг',
	[RaceType.Human]: 'Человек',
	[RaceType.Elf]: 'Эльф',
};

export interface RaceItem {
	value: RaceType;
	label: string;
}

export const RaceTypeList: RaceItem[] = [
	{ value: RaceType.Gnome, label: RaceTitles[RaceType.Gnome] },
	{ value: RaceType.Dwarf, label: RaceTitles[RaceType.Dwarf] },
	{ value: RaceType.Dragonborn, label: RaceTitles[RaceType.Dragonborn] },
	{ value: RaceType.HalfOrk, label: RaceTitles[RaceType.HalfOrk] },
	{ value: RaceType.Halfling, label: RaceTitles[RaceType.Halfling] },
	{ value: RaceType.HalfElf, label: RaceTitles[RaceType.HalfElf] },
	{ value: RaceType.Tiefling, label: RaceTitles[RaceType.Tiefling] },
	{ value: RaceType.Human, label: RaceTitles[RaceType.Human] },
	{ value: RaceType.Elf, label: RaceTitles[RaceType.Elf] },
];