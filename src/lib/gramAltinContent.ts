import { SITE_BASE_URL } from '@/lib/siteConfig';

export { SITE_BASE_URL };

export interface GramContent {
  whatIs: string;
  investment: string;
  priceSpread: string;
  useCases: string;
}

type GramCategory = 'micro' | 'small' | 'medium' | 'large' | 'xlarge';

function getCategory(gram: number): GramCategory {
  if (gram <= 5) return 'micro';
  if (gram <= 20) return 'small';
  if (gram <= 100) return 'medium';
  if (gram <= 500) return 'large';
  return 'xlarge';
}

/** Sitede yayınlanan tüm gram altın URL’leri: 1–100 (dahil). */
export const GRAM_PAGES_1_TO_100: number[] = Array.from({ length: 100 }, (_, i) => i + 1);

/** Kanonik gram sayfası URL’si (SEO). */
export function gramAltinPath(gram: number): string {
  return `/${gram}-gr-altin-kac-tl`;
}

export function gramAltinAbsoluteUrl(gram: number): string {
  return `${SITE_BASE_URL}${gramAltinPath(gram)}`;
}

export function generateGramContent(gram: number): GramContent {
  const cat = getCategory(gram);

  const whatIs: Record<GramCategory, string> = {
    micro:
      `${gram} gram altın, bireysel yatırımcılar ve altın birikimine yeni başlayanlar için ideal bir giriş miktarıdır. Standart 24 ayar saf altın birim ağırlığı üzerinden hesaplanan bu miktar, küçük boyutuna karşın değerini koruyan güvenilir bir yatırım aracıdır. Kapalıçarşı başta olmak üzere tüm yetkili kuyumcularda kolayca alınıp satılabilen ${gram} gram altın, enflasyona karşı etkili bir korunma sağlar. Türkiye'de altın fiyatları uluslararası ons altın fiyatı ve USD/TL kurunun birleşiminden oluşmaktadır; dolayısıyla ${gram} gram altın hem döviz hem de enflasyon riskine karşı çift taraflı bir kalkan işlevi görür. Gençler, öğrenciler ve düşük bütçeli yatırımcılar için ${gram} gramlık altın, birikimlerinin korunması açısından pratik ve erişilebilir bir seçenektir.`,
    small:
      `${gram} gram altın, aylık düzenli tasarruf yapanların sıkça tercih ettiği bir yatırım miktarıdır. Bu büyüklük, hem taşınabilirlik hem de yatırım değeri açısından dengeli bir seçenek sunar. Kapalıçarşı'da günlük yoğun işlem hacmiyle ${gram} gram altın, herhangi bir anda kolayca nakde dönüştürülebilir. Altın fiyatları gün içinde piyasa koşullarına göre değiştiğinden, ${gram} gram altın alımı için piyasanın görece sakin olduğu sabah saatlerini takip etmek avantajlıdır. 24 ayar ham altın fiyatı üzerinden hesaplanan bu miktar, işçilik maliyeti içermediğinden takı altınlarına göre çok daha uygun bir yatırım getirisi sunar.`,
    medium:
      `${gram} gram altın, yatırım bilinciyle hareket eden orta ölçekli tasarruf sahiplerinin portföyüne dahil ettiği ciddi bir miktardır. Uzun vadeli servet koruma stratejilerinde ${gram} gramlık alımlar, portföy çeşitlendirmesinin önemli bir ayağını oluşturabilir. Türkiye'de altın, tarihsel olarak enflasyonun üzerinde bir getiri sağlamış ve döviz kurundaki dalgalanmalarda değerini korumuştur. ${gram} gram altın, küçük miktarlara kıyasla oransal olarak daha düşük alış-satış farkıyla işlem görebilir; bu da yatırım verimliliğini artırır. Kapalıçarşı'da bu miktardaki altın için gün içinde anlık fiyatlar takip edilerek daha avantajlı alım noktaları yakalanabilir.`,
    large:
      `${gram} gram altın, kurumsal ve büyük bireysel yatırımcıların ciddi portföy kararlarında göz önünde bulundurduğu önemli bir miktardır. Bu büyüklükte altın tutmak, hem kur riskinden hem de enflasyondan güçlü bir korunma sağlar. ${gram} gram altının TL değeri, aynı anda hem uluslararası altın fiyatlarını hem de TL'nin değer hareketlerini yansıttığından çift yönlü bir avantaj sunar. Kapalıçarşı'da büyük miktarlı işlemlerde kuyumcuların daha rekabetçi spread uygulaması nedeniyle yatırım maliyeti görece düşer. ${gram} gram altın, acil nakit ihtiyacında hızlıca likide dönüştürülebilen bir değer deposu olarak da işlev görür.`,
    xlarge:
      `${gram} gram altın, kurumsal düzeyde servet yönetimi, büyük ölçekli portföy çeşitlendirmesi ve nesiller arası servet transferi için başvurulan önemli bir yatırım büyüklüğüdür. Bu miktarda altın tutmak, ciddi bir finansal güvence sağlar ve çeşitli kriz senaryolarında likit bir sığınak işlevi görür. ${gram} gram altının anlık piyasa değeri, uluslararası spot altın fiyatının (USD/ons) güncel USD/TL kuru ile çarpılmasından elde edilen değere çok yakındır. Büyük miktarlı işlemlerde kuyumcuların sunduğu daha dar alış-satış farkı, yatırım maliyetini önemli ölçüde düşürebilir. Fiziksel depolama, sigorta ve yasal gereklilikler bu büyüklükteki altın alımlarında mutlaka değerlendirilmelidir.`,
  };

  const investment: Record<GramCategory, string> = {
    micro:
      `${gram} gram altın, yatırım başlangıcı için son derece uygun bir miktardır. Her ay düzenli ${gram} gramlık alım yapıldığında, bir yıl içinde birikim tutarı önemli bir değere ulaşabilir. Bu "periyodik altın biriktirme" stratejisi, fiyat dalgalanmalarını ortalayarak riski minimize eder. Banka altın hesaplarıyla karşılaştırıldığında fiziksel altın edinmek, hem hesap yönetim ücreti içermez hem de gerçek mülkiyet hakkı sağlar. Ancak ${gram} gram gibi küçük miktarlarda alış-satış farkının (spread) oransal olarak biraz daha yüksek olabileceğini göz önünde bulundurmak gerekir; bu nedenle uzun vadeli tutma perspektifi kazancı artırır.`,
    small:
      `${gram} gram altın, hem başlangıç hem orta seviye yatırımcılar için makul bir miktardır. Düzenli ${gram} gramlık alımlar, uzun vadede anlamlı bir birikim oluşturabilir. Türkiye'de döviz ve altın fiyatları birlikte hareket ettiğinden ${gram} gram altın, TL değer kaybına karşı çift korumalı bir araçtır. Hisse senedi, kripto para veya döviz gibi volatil araçlarla kıyaslandığında altın, orta vadeli risk-getiri dengesinde daha tutarlı bir performans sergiler. ${gram} gram altın alımını banka altın hesabı yerine fiziksel olarak yapmak, saklama maliyetini ortadan kaldırır ve doğrudan mülkiyet avantajı sağlar.`,
    medium:
      `${gram} gram altın, portföy çeşitlendirmesi açısından önemli bir ağırlık taşıyan yatırım büyüklüğüdür. Finansal danışmanlar genellikle toplam portföyün %5–15'inin altına ayrılmasını önermektedir; ${gram} gram altın bu hedefi karşılamak için uygun bir miktar olabilir. Kapalıçarşı'da ${gram} gram altın için spot piyasaya yakın fiyatlar elde etmek mümkündür; bu da banka veya aracı kurum üzerinden yapılan alımlara kıyasla maliyet avantajı sağlar. Uzun vadeli bakıldığında, ${gram} gram altın tarihsel olarak hem enflasyona karşı değerini korumuş hem de ciddi dönemsel değer artışları kaydetmiştir. Emeklilik planlamasında altın birikimi için ${gram} gram, anlamlı bir portföy payı teşkil eder.`,
    large:
      `${gram} gram altın, servet yönetiminde merkezi bir yer tutan büyük ölçekli bir yatırım büyüklüğüdür. Bu miktarda altın, portföy çeşitlendirmesinde kritik bir denge unsuru sağlar ve kriz dönemlerinde likit değer deposu işlevi görür. ${gram} gram altın için Kapalıçarşı alış-satış farkı, küçük miktarlara kıyasla oransal olarak daha düşük olup yatırım verimliliğini artırır. Ayrıca büyük miktarlı altın alımlarında yetkili kuyumcularla birebir görüşülerek daha iyi fiyat elde edilebilir. Reel getiri açısından değerlendirildiğinde, ${gram} gram altın uzun vadeli tutulduğunda hem döviz değer kazancından hem de uluslararası altın fiyatı artışından faydalanır.`,
    xlarge:
      `${gram} gram altın, stratejik büyük ölçekli servet yönetimi kararlarında öne çıkan miktardır. Bu büyüklükte altın yatırımı, birden fazla ülkedeki ekonomik risklere karşı güçlü bir tampon oluşturur. Büyük miktarlı alımlarda spot fiyata çok yakın işlem yapılabilmesi, yatırım maliyetini önemli ölçüde azaltır. Yasal gereklilikler çerçevesinde bankalar veya yetkili aracılar üzerinden gerçekleştirilecek ${gram} gram altın alımları, hem güvenlik hem de mevzuata uyumluluk açısından tercih edilmelidir. Bu büyüklükte altın varlığı için fiziksel depolama ve sigorta seçenekleri mutlaka değerlendirilmelidir.`,
  };

  const priceSpread: Record<GramCategory, string> = {
    micro:
      `Kapalıçarşı'da ${gram} gram altın için uygulanan alış-satış farkı (spread), gram başına ortalama %1–3 arasında değişmektedir. Küçük miktarlardaki işlemlerde bu fark oransal olarak biraz daha yüksek olabilir; çünkü kuyumcular sabit işlem maliyetlerini her alım için yansıtmaktadır. Sabah saatlerinde ve işlem hacminin yüksek olduğu dönemlerde fiyatlar genellikle daha rekabetçidir. ${gram} gram altın alımında birden fazla kuyumcudan fiyat almak, en iyi koşulları elde etmenize yardımcı olur. Online altın satın alımları cazip görünse de fiziksel teslim maliyetleri ve güvenilirlik açısından Kapalıçarşı hâlâ birincil tercih olmaya devam etmektedir.`,
    small:
      `${gram} gram altın için Kapalıçarşı alış-satış farkı, günlük piyasa koşullarına bağlı olarak %1–2,5 arasında seyreder. Banka altın hesaplarına kıyasla Kapalıçarşı genellikle daha dar bir spread sunar; bu da hem alıcı hem de satıcı açısından avantajlıdır. ${gram} gram gibi orta küçüklükteki miktarlarda işlem yaparken yetkili ve güvenilir kuyumcuları seçmek, hem fiyat avantajı hem de güvenlik açısından önem taşır. Kapalıçarşı'nın işlem saatleri (Pazartesi–Cumartesi, 08:30–19:00) dışındaki fiyatlar değişmez; piyasa saatlerinde işlem yaparak anlık fiyatlardan yararlanabilirsiniz.`,
    medium:
      `${gram} gram altın işlemlerinde Kapalıçarşı, banka ve online platformlara kıyasla genellikle daha avantajlı alış-satış farkı sunar. Bu miktardaki işlemler için spread %0,8–2 düzeyine inebilir. ${gram} gramlık işlemlerde gün içindeki fiyat hareketlerine dikkat etmek önemlidir: Türk altın piyasası, İstanbul Kapalıçarşı'nın aktif olduğu saatlerde (08:30–17:00) en likit dönemi yaşar. Kuyumcu bazında büyük farklılıklar olabileceğinden, işlem öncesinde birkaç kuyumcudan teklif almak tavsiye edilir.`,
    large:
      `${gram} gram gibi yüksek miktarlardaki altın işlemlerinde Kapalıçarşı alış-satış farkı oransal olarak belirgin biçimde düşer. Bu büyüklükteki işlemler için kuyumcularla özel fiyat görüşmesi yapılabilir ve spot fiyata çok yakın koşullar elde edilebilir. ${gram} gram altın alım-satımında güvenilirlik ve köklü ticaret geçmişi önemlidir; bu nedenle büyük ve tanınmış Kapalıçarşı esnafı tercih edilmelidir. Büyük hacimli işlemlerde kasa teslimi, belgelendirme ve işlem güvenliği de göz ardı edilmemesi gereken faktörler arasındadır.`,
    xlarge:
      `${gram} gram düzeyindeki çok büyük miktarlı altın işlemlerinde Kapalıçarşı ve yetkili kuyumcular spot fiyata son derece yakın koşullar sunabilmektedir. Bu büyüklükteki işlemlerde alış-satış farkı %0,5–1 seviyesine kadar düşebilir. Ancak ${gram} gram altın değeri yüksek bir TL rakamına karşılık geldiğinden, işlem güvenliği ve yasal gereklilikler (vergi, belge, banka transferi) mutlaka yerine getirilmelidir. Büyük miktarlı fiziksel altın için yetkili kuyumcu, banka altın kasası veya profesyonel saklama hizmetleri tercih edilmelidir. Bu büyüklükteki altın işlemlerinde uzman bir finansal danışmana başvurmak riski minimize eder.`,
  };

  const useCases: Record<GramCategory, string> = {
    micro:
      `${gram} gram altın, gündelik hayatta pek çok farklı amaçla kullanılabilmektedir. Düğün, nişan, sünnet, doğum günü ve bayram gibi özel günlerde ${gram} gramlık altın hediye etmek Türk kültüründe yaygın bir gelenektir. Çocuklar için kurulan altın birikimi planları, çoğunlukla ${gram} gramlık periyodik alımlarla başlar ve yıllar içinde önemli bir birikime dönüşür. Ayrıca aylık bütçesinden küçük miktarlar ayırarak altın biriktirmek isteyen genç tasarrufçular, ${gram} gramlık alımları belirli aralıklarla tekrarlayarak maaş başı "dijital kumbara" oluşturabilir. Enflasyona karşı TL birikimlerini güvence altına almak isteyen bireyler için de ${gram} gram altın, pratik ve erişilebilir bir araçtır.`,
    small:
      `${gram} gram altın, bireysel tasarruf, hediye ve kısa-orta vadeli yatırım amacıyla sıkça tercih edilen miktardır. Aylık birikim hedefi olan tasarrufçular için ${gram} gramlık düzenli alımlar, sene sonunda ciddi bir altın portföyü oluşturabilir. Küçük ölçekli işletme sahipleri, acil nakit ihtiyacına karşı likit rezerv olarak ${gram} gram altın bulundurmayı tercih edebilir. Eğitime, ev alımına veya emekliliğe hazırlanan bireyler için de ${gram} gram altın, değer koruyan bir birikim aracıdır. Bayramlarda ailelerin çocuklara hediye ettiği altın miktarları çoğunlukla bu aralıkta olmaktadır.`,
    medium:
      `${gram} gram altın, büyük harcamalara hazırlık (ev peşinatı, araba, eğitim) veya uzun vadeli servet oluşturma stratejilerinde anlamlı bir yer tutar. Bu miktar, orta ölçekli yatırımcıların portföy çeşitlendirmesi için uygun bir birim büyüklüğüdür. Şirket yedekleri, işletme nakit rezervleri veya kurumsal birikim amaçlı altın alımları da sıklıkla bu büyüklük aralığında gerçekleşmektedir. Emeklilik planlamasında portföyün bir bölümünü altına dönüştürmek isteyenler için ${gram} gram, dengeli bir pay sunar. Aile içi servet transferi ve miras planlaması açısından da bu miktar kullanışlı bir değer deposu işlevi görür.`,
    large:
      `${gram} gram altın, büyük ölçekli servet koruma, gayrimenkul alımına hazırlık ve uzun vadeli portföy çeşitlendirmesi için tercih edilen bir miktardır. Ekonomik belirsizlik dönemlerinde kurumsal ve bireysel yatırımcılar, portföylerinin önemli bir bölümünü ${gram} gram altın biçiminde tutarak hem kur hem enflasyon riskini minimize eder. Nesil içi ve nesiller arası servet devri açısından altın, kolay taşınabilir ve evrensel değere sahip bir araç olarak öne çıkar. ${gram} gram altın değeri, büyük yatırımlar için güçlü bir teminat ve likit rezerv niteliği taşır. Özellikle ekonomik kriz senaryolarında ${gram} gram altın, diğer yatırım araçlarının değer kaybettiği dönemlerde korunma sağlar.`,
    xlarge:
      `${gram} gram altın, stratejik servet yönetiminin temel araçlarından biri olarak kabul görmektedir. Bu büyüklükteki altın varlığı; büyük altyapı veya gayrimenkul projeleri için teminat, şirket büyük hissedar rezervleri, nesil atlayan servet transferi ve uluslararası portföy çeşitlendirmesi gibi kapsamlı finansal hedeflere hizmet eder. ${gram} gram altının fiziksel depolanması için kasa kiralama, banka saklama hizmetleri veya özel güvenlik çözümleri zorunludur. Bu büyüklükteki yatırımlarda yasal yükümlülükler (Gelir İdaresi bildirimleri, kayıt gereklilikleri) eksiksiz yerine getirilmelidir. Profesyonel servet danışmanlarıyla çalışmak, bu büyüklükteki altın varlığının en verimli şekilde yönetilmesini sağlar.`,
  };

  return {
    whatIs: whatIs[cat],
    investment: investment[cat],
    priceSpread: priceSpread[cat],
    useCases: useCases[cat],
  };
}
