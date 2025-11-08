export enum DamageType {
    Acid = 'acid',
    Blunt = 'blunt',
    Cold = 'cold',
    Fire = 'fire',
    Force = 'force',
    Lightning = 'lightning',
    Necrotic = 'necrotic',
    Pierce = 'pierce',
    Poison = 'poison',
    Psychic = 'psychic',
    Radiant = 'radiant',
    Slash = 'slash' ,
    Thunder = 'thunder',
}

export const DamageTitles: Record<DamageType, string> = {
	[DamageType.Acid]: 'Кислотный',
	[DamageType.Blunt]: 'Дробящий',
	[DamageType.Cold]: 'Холодом',
	[DamageType.Fire]: 'Огненый',
	[DamageType.Force]: 'Силовой',
	[DamageType.Lightning]: 'Молнией',
	[DamageType.Necrotic]: 'Некротический',
	[DamageType.Pierce]: 'Колющий',
	[DamageType.Poison]: 'Ядовитый',
	[DamageType.Psychic]: 'Психический',
	[DamageType.Radiant]: 'Лучистый',
	[DamageType.Slash]: 'Рубящий',
	[DamageType.Thunder]: 'Громовой',
};


export interface DamageItem {
	value: DamageType;
	label: string;
}


export const DamageTypeList: DamageItem[] = [
	{ value: DamageType.Acid, label: DamageTitles[DamageType.Acid]},
	{ value: DamageType.Blunt, label: DamageTitles[DamageType.Blunt]},
	{ value: DamageType.Cold, label: DamageTitles[DamageType.Cold]},
	{ value: DamageType.Fire, label: DamageTitles[DamageType.Fire]},
	{ value: DamageType.Force, label: DamageTitles[DamageType.Force]},
	{ value: DamageType.Lightning, label: DamageTitles[DamageType.Lightning]},
	{ value: DamageType.Necrotic, label: DamageTitles[DamageType.Necrotic]},
	{ value: DamageType.Pierce, label: DamageTitles[DamageType.Pierce]},
	{ value: DamageType.Poison, label: DamageTitles[DamageType.Poison]},
	{ value: DamageType.Psychic, label: DamageTitles[DamageType.Psychic]},
	{ value: DamageType.Radiant, label: DamageTitles[DamageType.Radiant]},
	{ value: DamageType.Slash, label: DamageTitles[DamageType.Slash]},
	{ value: DamageType.Thunder, label: DamageTitles[DamageType.Thunder]},
];



export enum AttackType {
    Melee = 'melee',
    Ranged = 'ranged',
}

export const AttackTitles: Record<AttackType, string> = {
	[AttackType.Melee]: 'Ближнее',
	[AttackType.Ranged]: 'Дистанционное',
};

export interface AttackItem {
	value: AttackType;
	label: string;
}

export const AttackTypeList: AttackItem[] = [
	{ value: AttackType.Melee, label: AttackTitles[AttackType.Melee] },
	{ value: AttackType.Ranged, label: AttackTitles[AttackType.Ranged] },
];

export enum HoldType {
    Twohand = 'twohand',
    Onehand = 'onehand',
}

export const HoldTitles: Record<HoldType, string> = {
	[HoldType.Onehand]: 'Одноручное',
	[HoldType.Twohand]: 'Двуручное',
};

export interface HoldItem {
	value: HoldType;
	label: string;
}

export const HoldTypeList: HoldItem[] = [
	{ value: HoldType.Onehand, label: HoldTitles[HoldType.Onehand] },
	{ value: HoldType.Twohand, label: HoldTitles[HoldType.Twohand] },
];

export enum SpellType {
    Spell = 'spell',
    Charm = 'charm',
}

export const SpellTitles: Record<SpellType, string> = {
	[SpellType.Spell]: 'Заклинание',
	[SpellType.Charm]: 'Заговор',
};

export interface SpellItem {
	value: SpellType;
	label: string;
}

export const SpellTypeList: SpellItem[] = [
	{ value: SpellType.Spell, label: SpellTitles[SpellType.Spell] },
	{ value: SpellType.Charm, label: SpellTitles[SpellType.Charm] },
];