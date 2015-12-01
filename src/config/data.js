import Immutable, { Map, List } from 'immutable';

export const compositions = Immutable.fromJS([
	{
		name: 'N ADJ',
		nameLocalized: 'Сущ. + Прил.',
		partsOfSpeech: {
			'noun': {
				name: 'noun',
				nameLocalized: 'Существительное',
				allForms: false,
				query: '',
				forms: {
					offset: 200,
					selected: []
				},
				selected: '',
				offset: 0,
			},
			'adj': {
				name: 'adj',
				nameLocalized: 'Прилагательное',
				allForms: false,
				query: '',
				forms: {
					offset: 200,
					selected: []
				},
				selected: '',
				offset: 0,
			}
		}
	},
	/*{
		name: 'V N',
		nameLocalized: 'Глаг. + Сущ.',
		partsOfSpeech: [
			{
				name: 'verb',
				nameLocalized: 'Глагол',
				allForms: false,
				query: '',
				forms: {
					offset: 200,
					selected: []
				},
				selected: '',
				offset: 0,
			},
			{
				name: 'noun',
				nameLocalized: 'Существительное',
				allForms: false,
				query: '',
				forms: {
					offset: 200,
					selected: []
				},
				selected: '',
				offset: 0,
			}
		]
	}*/
]);
