import tools from 'satanic'
import { config } from './config.mjs'
// import {
//     getCitiesKeyboard,
//     getRegionsKeyboard
// } from './regions.mjs'

const ageGroups = {
    female: [
        [[12, 13], [12, 14]],
        [[14, 15], [13, 17]],
        [[16, 17], [15, 19]],
        [[18, 19], [17, 24]],
        [[20, 21], [19, 25]],
        [[22, 24], [21, 29]],
        [[25, 26], [24, 31]],
        [[27, 28], [26, 34]],
        [[29, 30], [28, 38]],
        [[31, 32], [30, 42]],
        [[32, 9999], [32, 9999]]
    ],
    male: [
        [[14, 15], [13, 16]],
        [[15, 17], [14, 17]],
        [[17, 18], [15, 19]],
        [[19, 20], [16, 21]],
        [[21, 24], [17, 25]],
        [[25, 26], [18, 27]],
        [[27, 29], [21, 31]],
        [[30, 32], [24, 34]],
        [[33, 36], [26, 38]],
        [[37, 48], [33, 50]],
        [[48, 9999], [48, 9999]]
    ]
}

const reportReasons = {
    'nsfw': '🔞 Материал для взрослых',
    'sale': '💰 Продажа товаров или услуг',
    'ignor': '😴 Не отвечает',
    'other': '❓ Другое',
    'none': '✖️ Отменить'
}

const texts = {
    greeting: '👋 Привет',
    mainMenu: '1. Смотреть анкеты.\n2. Моя анкета.\n3. Я больше не хочу никого искать.\n***\n4. Пригласи друзей - получи больше лайков 😎.',
    greetingAgain: '👋 Привет снова\n1. Смотреть анкеты.\n2. Моя анкета.\n3. Я больше не хочу никого искать.\n***\n4. Пригласи друзей - получи больше лайков 😎.',
    waitingLikes: 'Подождем, пока кто-то увидит твою анкету',
    mutualSympathy: (userId, name) => `Есть взаимная симпатия! Добавляй в друзья 👉 <a href="tg://user?id=${userId}">${name}</a>`,
    likeWhileBusy: 'Кому-то понравилась твоя анекта!\nЗаканчивай с вопросом выше и посмотрим кто это',
    like: (stringGender, pronoun) => `Ты понравился 1 ${stringGender}, показать ${pronoun}?\n\n1. Показать.\n2. Не хочу больше никого смотреть.`,
    form: {
        age: 'Сколько тебе лет?',
        gender: 'Выбери свой пол:',
        searchGender: 'Кто тебе интересен?',
        city: 'Из какого ты города?',
        name: 'Как тебя называть?',
        bio: 'Расскажи о себе и кого хочешь найти, чем предлагаешь заняться. Это поможет лучше подобрать тебе компанию.',
        media: 'Пришли фото или запиши видео (до 15 сек.) - его будут видеть другие пользователи при просмотре твоей анкеты.',
        form: 'Так выглядит твоя анкета:'
    },
    errors: {
        noMoreForms: '💢 ',
        oldButton: '💢 Это действие сейчас недоступно.',
        number: '💢 Введите <u>число</u>.',
        gender: '💢 Некорректный гендер. Используйте официальный клиент Telegram.',
        city: '💢 Введите название города.',
        name: '💢 Введите имя.',
        bio: '💢 Введите описание <u>до 100</u> символов.',
        media: '💢 Пришлите фото или видео (<u>не</u> отмечайте опцию "отправить как файл").',
        form: '💢 Некорректный запрос. Используйте официальный клиент Telegram.',
        noForms: '💢 Новых анкет пока нет.',
        likesLimit: '💢 Слишком много лайков за сегодня - ставь Мне нравится только тем, кто тебе действительно нравится.\nЗагляни к нам позже'
    },
    success: {
        bio: 'Текст анкеты успешно установлен.',
        media: 'Медиафайл успешно установлен.',
        report: 'Жалоба отправлена.'
    },
    report: (userId, targetUserId, reason) => `Пользователь <code>${userId}</code> пожаловался на пользователя <code>${targetUserId}</code> по причине ${reportReasons[reason]}`,
    bye: '👋',
    pro: `Ты получил(-а) +7 дней PRO аккаунта`,
    proEnded: `PRO аккаунт закончился`,
    finish: 'Был рад помочь! Возвращайся, когда снова захочешь найти кого-нибудь: /start',
    referal: (userId, name) => `<a href="tg://user?id=${userId}">${name}</a> зашел в бота по твоей ссылке!`,
    bonus: (total, total7, bonus) => `Пригласи друзей и получи больше лайков!\n\nТвоя статистика\nВсего пришло: ${total}\nПришло за 7 дней: ${total7}\nБонус к силе анкеты: ${bonus}%\n${Math.abs(total - 10) > 0 ? `Для получения PRO осталось пригласить: ${Math.abs(total - 10)}` : ''}\n\nПерешли друзьям или размести в своих соцсетях.\nВот твоя личная ссылка 👇`,
    referalMessage: userId => `Бот знакомств в Telegram! Найдет друзей или даже половинку👫\n👉 https://t.me/${config.botName}?start=inv${userId}`,
    edit: '1. Заполнить анкету заново.\n2. Изменить фото/видео.\n3. Изменить текст анкеты.\n4. Смотреть анкеты\n'
}

const buttons = {
    mainMenu: simple([
        ['1🚀', '2', '3', '4']
    ]),
    form: {
        gender: simple([
            ['Я девушка', 'Я парень']
        ], true),
        searchGender: simple([
            ['Девушки', 'Парни'],
            ['Все равно']
        ], true),
        // region: getRegionsKeyboard(),
        // city: region => getCitiesKeyboard,
        bio: simple([
            ['Пропустить']
        ], true),
        form: simple([
            ['Да', 'Изменить анкету']
        ], true)
    },
    hide: {
        reply_markup: {
            remove_keyboard: true
        }
    },
    review: simple([
        ['❤️', '👎', '💤']
    ], true),
    edit: numbers(4),
    respond: numbers(2),
    report: inline([
        [['⚠️ Пожаловаться', 'reportList']]
    ]),
    reportList: inline(
        Object
            .entries(reportReasons)
            .map(button => [[button[1], `report_${button[0]}`]])
    )
}


function numbers(amount) {
    return simple([
        new Array(amount)
            .fill()
            .map((_, i) => `${i + 1}`)
    ], true)
}

function simple(keys, onetime) {
    let keyboard = tools.Markup
        .keyboard(keys)
        .resize()
    keyboard = onetime ? keyboard.oneTime() : keyboard
    return Object.assign(
        { parse_mode: 'HTML' },
        keyboard.extra()
    )
}

function inline(keyboard) {
    return Object.assign(
        { parse_mode: 'HTML' },
        tools.Markup
            .inlineKeyboard(
                keyboard.map(
                    row => row.map(
                        key => tools.Markup.callbackButton(...key)
                    )
                )
            )
            .extra()
    )
}

export {
    texts,
    buttons,
    simple,
    inline,
    ageGroups,
    reportReasons
}