export enum BackType{
    Entertainer ='entertainer',
    Urchin ='urchin',
    Noble ='noble',
    GuildArtisian ='guild_artisian',
    Sailor = 'sailor',
    Sage ='sage',
    FolkHero ='folk_hero',
    Hermit ='hermit',
    Criminal ='criminal',
    Acolyte ='acolyte',
    Soldier ='soldier',
    Outlander ='outlander',
    Charlatan ='charlatan',
}

export const BackTitles: Record<BackType, string> = {
	[BackType.Entertainer]: 'Артист',
	[BackType.Urchin]: 'Беспризорник',
	[BackType.Noble]: 'Благородный',
	[BackType.GuildArtisian]: 'Ремесленник',
	[BackType.Sailor]: 'Моряк',
	[BackType.Sage]: 'Мудрец',
	[BackType.FolkHero]: 'Народный герой',
	[BackType.Hermit]: 'Отшельник',
	[BackType.Criminal]: 'Преступник',
	[BackType.Acolyte]: 'Прислушник',
	[BackType.Soldier]: 'Солдат',
	[BackType.Outlander]: 'Чужеземец',
	[BackType.Charlatan]: 'Шарлатан',
};

export interface BackItem {
	value: BackType;
	label: string;
}

export const BackTypeList: BackItem[] = [
	{ value: BackType.Entertainer, label: BackTitles[BackType.Entertainer] },
	{ value: BackType.Urchin, label: BackTitles[BackType.Urchin] },
	{ value: BackType.Noble, label: BackTitles[BackType.Noble] },
	{ value: BackType.GuildArtisian, label: BackTitles[BackType.GuildArtisian] },
	{ value: BackType.Sailor, label: BackTitles[BackType.Sailor] },
	{ value: BackType.Sage, label: BackTitles[BackType.Sage] },
	{ value: BackType.FolkHero, label: BackTitles[BackType.FolkHero] },
	{ value: BackType.Hermit, label: BackTitles[BackType.Hermit] },
	{ value: BackType.Criminal, label: BackTitles[BackType.Criminal] },
	{ value: BackType.Acolyte, label: BackTitles[BackType.Acolyte] },
	{ value: BackType.Soldier, label: BackTitles[BackType.Soldier] },
	{ value: BackType.Outlander, label: BackTitles[BackType.Outlander] },
	{ value: BackType.Charlatan, label: BackTitles[BackType.Charlatan] },
];