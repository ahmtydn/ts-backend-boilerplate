// cSpell:disable

/**
 * Returns an error message based on the provided locale and status code.
 *
 * @param {string} locale - The locale for the error message (e.g., 'en', 'tr').
 * @param {number} statusCode - The HTTP status code (e.g., 400, 401).
 * @returns {string} The error message corresponding to the locale and status code.
 *
 * Available status codes:
 * - 200: OK! The request has succeeded.
 * - 201: Created! The request has been fulfilled and resulted in a new resource being created.
 * - 204: No Content! The server successfully processed the request, but is not returning any content.
 * - 400: Bad Request! The server could not understand the request due to invalid syntax.
 * - 401: Unauthorized access!
 * - 403: Forbidden! You do not have permission to access this resource.
 * - 404: Not Found! The requested resource could not be found.
 * - 405: Method Not Allowed! The request method is not supported for the requested resource.
 * - 409: Conflict! The request could not be completed due to a conflict with the current state of the resource.
 * - 410: Gone! The requested resource is no longer available and will not be available again.
 * - 500: Internal Server Error! Something went wrong on the server.
 * - 501: Not Implemented! The server does not support the functionality required to fulfill the request.
 * - 502: Bad Gateway! The server received an invalid response from the upstream server.
 * - 503: Service Unavailable! The server is currently unable to handle the request due to temporary overloading or maintenance.
 * - 504: Gateway Timeout! The server did not receive a timely response from the upstream server.
 */
export function errorMessage(locale: string = 'en', statusCode: number | string = 500, extraMessage?: string): string {
  const customMessages = {
    email_already_exists: {
      tr: 'Girilen e-posta adresi zaten kayıtlı!',
      en: 'The entered email address is already registered!',
    },
    not_exist_user: {
      tr: 'Kullanıcı bulunamadı!',
      en: 'User not found!',
    },
    invalid_password: {
      tr: 'Şifre geçersiz!',
      en: 'Invalid password!',
    },
    events_already_exist: {
      tr: 'Tüm etkinlikler zaten mevcut!',
      en: 'All events already exist!',
    },
  };
  const messages = {
    200: {
      en: 'OK! The request has succeeded.',
      tr: 'Tamam! İstek başarıyla tamamlandı.',
    },
    201: {
      en: 'Created! The request has been fulfilled and resulted in a new resource being created.',
      tr: 'Oluşturuldu! İstek yerine getirildi ve yeni bir kaynak oluşturuldu.',
    },
    204: {
      en: 'No Content! The server successfully processed the request, but is not returning any content.',
      tr: 'İçerik Yok! Sunucu isteği başarıyla işledi, ancak içerik döndürmüyor.',
    },
    400: {
      en: 'Bad Request! The server could not understand the request due to invalid syntax.',
      tr: 'Geçersiz istek! Sunucu, geçersiz sözdizimi nedeniyle isteği anlayamadı.',
    },
    401: {
      en: 'Unauthorized access!',
      tr: 'Yetkisiz erişim!',
    },
    403: {
      en: 'Forbidden! You do not have permission to access this resource.',
      tr: 'Yasak! Bu kaynağa erişim izniniz yok.',
    },
    404: {
      en: 'Not Found! The requested resource could not be found.',
      tr: 'Bulunamadı! İstenen kaynak bulunamadı.',
    },
    405: {
      en: 'Method Not Allowed! The request method is not supported for the requested resource.',
      tr: 'Yöntem İzin Verilmiyor! İstek yöntemi, istenen kaynak için desteklenmiyor.',
    },
    409: {
      en: 'Conflict! The request could not be completed due to a conflict with the current state of the resource.',
      tr: 'Çakışma! İstek, kaynağın mevcut durumu ile çakıştığı için tamamlanamadı.',
    },
    410: {
      en: 'Gone! The requested resource is no longer available and will not be available again.',
      tr: 'Gitti! İstenen kaynak artık mevcut değil ve tekrar mevcut olmayacak.',
    },
    500: {
      en: 'Internal Server Error! Something went wrong on the server.',
      tr: 'Sunucu Hatası! Sunucuda bir şeyler ters gitti.',
    },
    501: {
      en: 'Not Implemented! The server does not support the functionality required to fulfill the request.',
      tr: 'Uygulanmadı! Sunucu, isteği yerine getirmek için gerekli işlevselliği desteklemiyor.',
    },
    502: {
      en: 'Bad Gateway! The server received an invalid response from the upstream server.',
      tr: 'Geçersiz Ağ Geçidi! Sunucu, üst sunucudan geçersiz bir yanıt aldı.',
    },
    503: {
      en: 'Service Unavailable! The server is currently unable to handle the request due to temporary overloading or maintenance.',
      tr: 'Hizmet Kullanılamıyor! Sunucu, geçici aşırı yüklenme veya bakım nedeniyle şu anda isteği işleyemiyor.',
    },
    504: {
      en: 'Gateway Timeout! The server did not receive a timely response from the upstream server.',
      tr: 'Ağ Geçidi Zaman Aşımı! Sunucu, üst sunucudan zamanında yanıt almadı.',
    },
  };

  const message = typeof statusCode === 'string' ? customMessages[statusCode]?.[locale] : messages[statusCode]?.[locale];
  return (message ?? messages[500][locale]) + (extraMessage ? extraMessage : '');
}
