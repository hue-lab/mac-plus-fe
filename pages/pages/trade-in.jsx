import {LazyLoadImage} from "react-lazy-load-image-component";
import React from "react";
import {getFieldsObject} from "~/utils/endpoints/fields";

TradeIn.getInitialProps = async (context) => {
  const fields = await getFieldsObject('trade-in-title', 'trade-in-subtitle' ,'trade-in-description');
  return { fields: fields };
}

export default function TradeIn ({ fields }) {
  return (
    <div className="trade">
      <div className="trade__hero">
        <div className="container trade__hero-container">
          <LazyLoadImage
            src="./images/recycle.png"
            alt="recycle"
            width="auto"
            height={ 60 }
            className="trade__hero-icon mb-4"
          />
          <h1>{fields['trade-in-title']}</h1>
          <h2>{fields['trade-in-subtitle']}</h2>
          <p>{fields['trade-in-description']}</p>
          <LazyLoadImage
            src="./images/trade-in-image.webp"
            alt="recycle"
            width="auto"
            height={ 400 }
            className="trade__hero-image"
          />
        </div>
      </div>
      <div className="container">
        <div className="trade__points">
          <div className="trade__points-item">
            <div className="trade-item__num">
              01
            </div>
            <div className="trade-item__title">
              Принесите свои устройства в наш магазин
            </div>
            <div className="trade-item__text">
              Мы принимаем все модели iPhone, iPad, Apple Watch, ноутбуки Mac, а также смартфоны и планшеты других производителей. Устройство не должно иметь следов вздутия батареи, отсутствующих деталей и деформации корпуса.
            </div>
          </div>
          <div className="trade__points-item">
            <div className="trade-item__num">
              02
            </div>
            <div className="trade-item__title">
              Отдайте устройство на мгновенную диагностику
            </div>
            <div className="trade-item__text">
              Если устройство соответствует условиям из пункта 1, мы проведем диагностику для оценки его стоимости. При оценке мы учитываем повреждения и царапины на корпусе, экране, сколы и другие следы использования. Это займет не более 15 минут.
            </div>
          </div>
          <div className="trade__points-item">
            <div className="trade-item__num">
              03
            </div>
            <div className="trade-item__title">
              Используйте скидку при покупке нового устройства
            </div>
            <div className="trade-item__text">
              Все ваши устройства, сданные по программе трейд-ин, могут теперь суммарно использоваться при оплате вашей покупки. Что вы хотите купить — решать вам, ограничений по ассортименту нет. Оставшуюся сумму можно доплатить картой, наличными или оформить в рассрочку или кредит.
            </div>
          </div>
        </div>
      </div>
      <div className="trade__text">
        <div className="container">
          <p>Условия акции:</p>
          <p>Срок действия акции не ограничен.</p>
          <p>
            Акция действует при покупке в розничных магазинах, при заказе в интернет-магазине при условии самовывоза, а также с помощью услуги «Выездной выкуп». В акции могут принять участие физические лица, достигшие 18-летнего возраста.
            Сдать по акции можно все модели iPhone, iPad, Apple Watch, ноутбуки Mac а также смартфоны и планшеты других производителей. Приобрести — любую технику и аксессуары из ассортимента restore, при условии, что общая сумма покупки будет равна или больше выкупной стоимости сданной техники.
            Чтобы узнать возможный размер скидки, нужно обратиться в любой розничный магазин с паспортом и с устройством к сдаче.
            Новые устройство может быть приобретено по действующей на момент заключения договора программе кредитования или рассрочки. Подробности и условия можно уточнить у консультантов в магазине. Акция не суммируется с другими скидками и специальными предложениями. Бонусная программа действует только на начисление, списание бонусов недоступно. Оплата нового устройства может быть произведена наличными средствами, платежной картой, а также Подарочной картой restore.
            Компания оставляет за собой право на завершение акции без предварительного уведомления покупателей.
          </p>
        </div>
      </div>
    </div>
  )
}
