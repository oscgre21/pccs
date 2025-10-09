# Integración Plataforma de Pagos AZUL

## Resumen
Este documento detalla los aspectos técnicos necesarios para integrar la Página de Pago AZUL en el sitio web de PCCS.

---

## 1. Información General

### URLs de Integración

| Ambiente | URL |
|----------|-----|
| **Producción (Principal)** | https://pagos.azul.com.do/PaymentPage/Default.aspx |
| **Producción (Alterno)** | https://contpagos.azul.com.do/PaymentPage/Default.aspx |
| **Pruebas** | https://pruebas.azul.com.do/PaymentPage/ |

### Notas Importantes
- Los datos de pruebas y producción **NUNCA** son similares
- Los factores de autenticación de prueba y producción **NUNCA** son los mismos
- Las URLs de pruebas y producción **NO** son las mismas
- La Página de Pago usa certificado digital, requiere acceso a Internet para validar el certificado
- El comercio debe manejar dos URLs (principal y alterno) para conexión de contingencia

---

## 2. Flujo de Integración

### Proceso de Pago

1. **Cliente inicia pago**: El usuario hace clic en "pagar" en el sitio del comercio
2. **Envío a Página de Pago**: El comercio envía un formulario HTML POST con los datos de la transacción
3. **Captura de datos**: El cliente ingresa datos de tarjeta en la Página de Pago AZUL
4. **Confirmación**: El cliente confirma la información y procede con el pago
5. **Redirección**: El cliente es redirigido de vuelta al sitio del comercio con el resultado de la transacción
6. **Notificación por email**: Se envía confirmación del pago vía correo electrónico

---

## 3. Parámetros de Entrada (POST)

### Formulario HTML de Ejemplo

```html
<form action="https://pruebas.azul.com.do/PaymentPage/" method="post" id="paymentForm" name="paymentForm">
  <input type="hidden" id="MerchantId" name="MerchantId" value="99999999999">
  <input type="hidden" id="MerchantName" name="MerchantName" value="Comercio prueba">
  <input type="hidden" id="MerchantType" name="MerchantType" value="ECommerce">
  <input type="hidden" id="CurrencyCode" name="CurrencyCode" value="$">
  <input type="hidden" id="OrderNumber" name="OrderNumber" value="1234">
  <input type="hidden" id="Amount" name="Amount" value="15000">
  <input type="hidden" id="ITBIS" name="ITBIS" value="2057">
  <input type="hidden" id="ApprovedUrl" name="ApprovedUrl" value="https://comercioprueba.com/aprobada/">
  <input type="hidden" id="DeclinedUrl" name="DeclinedUrl" value="https://comercioprueba.com/declinada/">
  <input type="hidden" id="CancelUrl" name="CancelUrl" value="https://comercioprueba.com/cancelada/">
  <input type="hidden" id="UseCustomField1" name="UseCustomField1" value="0">
  <input type="hidden" id="CustomField1Label" name="CustomField1Label" value="">
  <input type="hidden" id="CustomField1Value" name="CustomField1Value" value="">
  <input type="hidden" id="UseCustomField2" name="UseCustomField2" value="0">
  <input type="hidden" id="CustomField2Label" name="CustomField2Label" value="">
  <input type="hidden" id="CustomField2Value" name="CustomField2Value" value="">
  <input type="hidden" id="AuthHash" name="AuthHash" value="<?php echo $authHash; ?>">
  <input type="submit" name="submit" value="Enviar">
</form>
```

### Tabla de Parámetros Obligatorios

| Parámetro | Descripción | Obligatorio | HASH |
|-----------|-------------|-------------|------|
| **MerchantId** | Número de identificación del comercio asignado al momento de afiliación a AZUL | Sí | Sí |
| **MerchantName** | Nombre del comercio a ser desplegado en la página de pago | Sí | Sí |
| **MerchantType** | Tipo de comercio (de carácter informativo) | Sí | Sí |
| **CurrencyCode** | Moneda de la transacción. Cada MID transacciona con una sola moneda. Valor proporcionado por AZUL | Sí | Sí |
| **OrderNumber** | El número de orden de la transacción | Sí | Sí |
| **Amount** | Monto total de la transacción (impuestos incluidos). Se envía sin coma ni punto; los dos últimos dígitos representan los decimales. Ej: 1000 = 10.00, 1748321 = 17,483.21 | Sí | Sí |
| **ITBIS** | El valor del campo ITBIS utiliza el mismo formato que el campo Amount. Ej: 000 = 0.00, 1000 = 10.00 | Sí | Sí |
| **ApprovedUrl** | La URL donde será enviado el cliente final al finalizar la transacción con resultado aprobado. En el "querystring" son enviados los parámetros de la respuesta | Sí | Sí |
| **DeclinedUrl** | La URL donde será enviado el cliente final al concluir la transacción con resultado declinado. En el "querystring" son enviados los parámetros de la respuesta | Sí | Sí |
| **CancelUrl** | La URL donde será enviado el cliente final al cancelar la transacción. En este caso no son enviados parámetros en el "querystring" | Sí | Sí |
| **UseCustomField1** | Campos utilizados para proveer información adicional de la transacción al cliente final. Se debe completar con "1" para mostrar o "0" para no mostrarlas | Sí | Sí |
| **CustomField1Label** | Label del campo de detalle #1. Si "UseCustomField" es 1, este campo debe tener información | No | Sí |
| **CustomField1Value** | Información del "CustomField1Label". Si "UseCustomField" es 1, este campo debe tener información | No | Sí |
| **UseCustomField2** | Campos utilizados para proveer información adicional correspondiente al segundo grupo de datos de la transacción al cliente final. Se debe completar con "1" para mostrar o "0" para no mostrarlas | Sí | Sí |
| **CustomField2Label** | Label del campo de detalle #2. Si "UseCustomField" es 1, este campo debe tener información | No | Sí |
| **CustomField2Value** | Información del "CustomField2Label". Si "UseCustomField" es 1, este campo debe tener información | No | Sí |
| **AuthHash** | Es un hash HMAC SHA-512 que se debe proveer para fines de autenticación. Verifique el acápite "Manejo de la Autenticación" | Sí | N/A |

### Parámetros Opcionales

| Parámetro | Descripción | Obligatorio | HASH |
|-----------|-------------|-------------|------|
| **Locale** | Valores posibles ES (español) – EN (inglés). Muestra el payment page en el idioma seleccionado (Español / Inglés). Si no se manda el campo, se usa español por defecto | No | No |
| **SaveToDataVault** | Campo que da la instrucción a PaymentPage indicando que la tarjeta que digite el cliente final sea guardada en AZUL. Valores: 1 = Guardar, 0 = No guardar. Si el campo se encuentra ausente, se asume el valor 0 | No | No |
| **DataVaultToken** | Campo que debe contener el token generado por AZUL previamente. Si se manda este campo con el token, AZUL no va a pedir la tarjeta al cliente final. Solo exigirá el Código de Seguridad, de encontrarse habilitado | No | No |
| **AltMerchantName** | Campo que permite al Comercio colocar un nombre más descriptivo para que el tarjetahabiente pueda identificarle en su estado de cuenta. Se sugiere siempre colocar su nombre comercial adecuadamente a fin de evitar disputas. Máximo de 25 caracteres | No | No |
| **ShowTransactionResult** | Mostrar página de resultado de AZUL. Si está ausente o es 1 -> Muestra pantalla de resultado de AZUL. Si es 0 -> no muestra la pantalla de resultado de AZUL | No | No |

**Caracteres especiales prohibidos en AltMerchantName:**
- `( " )` Genera un error en el request
- `( \ )` Genera un error en el request
- `( ' )` Este carácter no se muestra en el mensaje del emisor

---

## 4. Autenticación (AuthHash)

### Generación del Hash

El valor del campo `AuthHash` debe ser calculado concatenando los siguientes campos en el orden indicado. El valor de AuthKey no es un campo enviado en el POST, sino un valor entregado por AZUL al momento de la afiliación.

**Cadena para Hash de Requerimiento:**
```
MerchantId + MerchantName + MerchantType + CurrencyCode + OrderNumber + Amount + ITBIS + ApprovedUrl + DeclinedUrl + CancelUrl + UseCustomField1 + CustomField1Label + CustomField1Value + UseCustomField2 + CustomField2Label + CustomField2Value + AuthKey
```

### Codificación UNICODE

- El HASH del requerimiento puede ser calculado desde una cadena UTF-8 o UNICODE
- El sistema lo acepta indistintamente
- **Recomendación:** Unicode es más seguro

### Ejemplo en C# (UNICODE)

```csharp
var all = new StringBuilder();
all.Append(MerchantId);
all.Append(MerchantName);
all.Append(MerchantType);
all.Append(currencyString);
all.Append(OrderNumber);
all.Append(Tools.Misc.DecimalToFixedString(Amount));
all.Append(Tools.Misc.DecimalToFixedString(Itbis));
all.Append(ApprovedUrl);
all.Append(DeclinedUrl);
all.Append(CancelUrl);
all.Append(Tools.Misc.BoolToNumeric(UseCustomField1));
all.Append(CustomField1Label);
all.Append(CustomField1Value);
all.Append(Tools.Misc.BoolToNumeric(UseCustomField2));
all.Append(CustomField2Label);
all.Append(CustomField2Value);
all.Append(AuthKey); //Proporcionado por SDP (no viaja en el POST)

textToHashBytes = Encoding.Unicode.GetBytes(all.ToString());
hashResult = encryptor.ComputeHash(textToHashBytes);
//Siendo encriptor del tipo System.Security.Cryptography.HMACSHA512()

//Para hacer la conversión de bytes a string.
for (int i = 0; i < hashResult.Length; i++)
    txtHash.Text += string.Format("{0:x2}", hashResult[i]);
```

### Ejemplo en PHP (UNICODE)

```php
function calculateAuthHashResponse() {
    $response_string = $this->ipn_data['OrderNumber']
        .$this->ipn_data['Amount']
        .$this->ipn_data['AuthorizationCode']
        .$this->ipn_data['DateTime']
        .$this->ipn_data['ResponseCode']
        .$this->ipn_data['IsoCode']
        .$this->ipn_data['ResponseMessage']
        .$this->ipn_data['ErrorDescription']
        .$this->ipn_data['RRN']
        .$this->auth_key;

    $response_string = mb_convert_encoding($response_string, 'UTF-16LE', 'ASCII');
    $authHashGenerado = hash_hmac('sha512', $response_string, $authKey);
    $authHashRecibido = $this->input->get('AuthHash');
}
```

---

## 5. Parámetros de Retorno (QueryString)

Cuando la plataforma de AZUL retorna a la URL indicada en el requerimiento, se remite la información del resultado de la transacción en el querystring.

**Cadena para Hash de Respuesta:**
```
OrderNumber + Amount + AuthorizationCode + DateTime + ResponseCode + ISOCode + ResponseMessage + ErrorDescription + RRN + AuthKey
```

### Tabla de Parámetros de Respuesta

| Parámetro | Descripción | HASH |
|-----------|-------------|------|
| **OrderNumber** | El número de orden enviado en el requerimiento inicial | Sí |
| **Amount** | Monto original de la transacción | Sí |
| **ITBIS** | ITBIS original de la transacción | No |
| **AuthorizationCode** | Código de autorización en caso de que la transacción haya sido aprobada | Sí |
| **DateTime** | Fecha de la transacción | Sí |
| **ResponseCode** | Respuesta de la transacción | Sí |
| **IsoCode** | Respuesta de la transacción | Sí |
| **ResponseMessage** | Respuesta de la transacción | Sí |
| **ErrorDescription** | Respuesta de la transacción | Sí |
| **RRN** | Número de referencia (Reference referral number) | Sí |
| **DataVaultToken** | En caso de que se reciba el campo SaveToDataVault con valor 1, Payment Page retornará el token generado para la tarjeta usada por el cliente | No |
| **DataVaultExpiration** | Expiración del token en formato AAAAMM | No |
| **DataVaultBrand** | Marca de la tarjeta usada (Visa, Mastercard, etc.) | No |
| **AzulOrderId** | # de orden de procesador AZUL | No |
| **Discounted** | Campo que identifica si la transacción aplicó para descuento por Bines: 0 = no se aplicó descuento, 1 = se aplicó descuento | No |

---

## 6. Tipos de Transacciones

### 6.1 Transacción de Venta (HOLD)

Para realizar una transacción con solo reserva de fondos o "Hold", debe realizar un requerimiento idéntico al de venta, incluyendo además un campo con nombre **"TrxType"** con el valor **"Hold"**.

En la respuesta de la transacción recibirá el parámetro **"AzulOrderId"**. Deberá guardar este valor para posteriormente realizar el posteo o "Post" de esta transacción "Hold".

### 6.2 Transacción POST

Para realizar el posteo o "Post", es necesario que realice la misma transacción, pero indicando **"Post"** en el campo **"TrxType"** e incluyendo en el campo **"AzulOrderId"** el valor recibido en la transacción original.

**Nota importante:** El monto para completar la autorización puede ser igual o menor al monto que fue pre-autorizado.

### 6.3 Transacción VOID (Anulación)

Para realizar una transacción Void (anulación), debe realizar un requerimiento idéntico al de venta, incluyendo:
- Campo **"TrxType"** con valor **"Void"**
- Campo **"AzulOrderId"** con el valor recibido en la transacción original a ser cancelada

**Limitaciones:**
- Para transacciones de **hold** (pre-autorizaciones): el void puede ser realizado en cualquier momento
- Para transacciones de **post y venta**: el void puede ser realizado sólo durante un período de 20 minutos posteriores a la realización del posteo o venta

---

## 7. Métodos de Pago Adicionales

### 7.1 Google Pay

Para implementar Google Pay en la página de pago, es requerido añadir el parámetro **"UseGooglePay"** con valor **"1"** al realizar el POST a la URL de Payment Page de AZUL.

**Características:**
- Integración disponible en canales de Payment Page, Link de Pago y Web Services
- Proporciona una billetera en las plataformas web para la mayoría de las plataformas y navegadores (desktop y mobile), y en Android de forma nativa
- Permite checkout rápido y sin la necesidad de digitar datos de pago de forma manual
- Token de pago encriptado que no requiere que el comercio maneje información sensible

**Pasos para habilitar:**
1. Habilitar la funcionalidad de Google Pay contactando a su oficial de negocios
2. Toda la interacción con Google Pay es realizada del lado de la plataforma de pago de AZUL

### 7.2 Apple Pay

Para implementar Apple Pay, agregar el parámetro **"UseApplePay"** con valor **"1"** al realizar el POST a la URL de Payment Page de AZUL.

**Características:**
- Proporciona una billetera digital en dispositivos Apple
- Permite checkout rápido y seguro sin necesidad de ingresar manualmente los datos de pago
- Token de pago encriptado que no requiere que el comercio maneje información sensible como el número de tarjeta, fecha de expiración y CVV

**Pasos para habilitar:**
1. Habilitar la funcionalidad de Apple Pay: Contacta a tu oficial de negocios para habilitar Apple Pay en tu comercio
2. Toda la interacción con Apple Pay se realiza del lado de la plataforma de pago de AZUL

---

## 8. DataVault (Tokenización)

### ¿Qué es DataVault?

El campo **"SaveToDataVault"** corresponde a una instrucción indicando a Página de Pagos que la tarjeta que sea usada sea guardada por AZUL y se le devuelva al comercio un token generado para la misma.

El token será un valor generado de forma aleatoria y asignado a la tarjeta usada en este comercio en específico. Su formato es alfanumérico de 30 a 40 posiciones.

**Ejemplos de tokens:**
- `FE1525FD-A59B-476A-9EFA-387D510689AB`
- `40E35437-F8AF-4039-BE8B-4B3C68D9B516`

### Valores posibles de "SaveToDataVault"

- **a)** Al estar en 1, PaymentPage guardará la tarjeta y responderá con el token generado. Este escenario solo es en el caso de ser aprobada dicha tarjeta
- **b)** Si se encuentra en 0, no se guardará la tarjeta que el cliente final colocó para pagar

### Respuesta Bóveda de Datos (DataVault)

Al usar DataVault, se recibirán de manera adicional los siguientes campos:

| Parámetro | Descripción |
|-----------|-------------|
| **DataVaultToken** | Token generado |
| **DataVaultExpiration** | Expiración del token en formato MMAA |
| **DataVaultBrand** | Marca de la tarjeta usada (Visa, Mastercard, etc.) |
| **AzulOrderId** | # de orden de procesador AZUL |

### Creación Token Bóveda de Datos

Se le ofrece al comercio la posibilidad de enviar a Payment Page un mensaje para solo capturar el token.

**Parámetros requeridos:**

| Parámetro | Descripción | Obligatorio | HASH |
|-----------|-------------|-------------|------|
| **MerchantId** | Número de identificación del comercio asignado al momento de afiliación a AZUL | Sí | Sí |
| **MerchantName** | Nombre del comercio a ser desplegado en la página de pago | Sí | Sí |
| **MerchantType** | Tipo de comercio (de carácter informativo) | Sí | Sí |
| **ApprovedUrl** | La URL donde será enviado el cliente final al finalizar la transacción con resultado aprobado | Sí | Sí |
| **TrxType** | CREATE | Sí | Sí |
| **DatavaultToken** | Sin valor | Sí | Sí |
| **DeclinedUrl** | La URL donde será enviado el cliente final al concluir la transacción con resultado declinado | Sí | Sí |
| **CancelUrl** | La URL donde será enviado el cliente final al cancelar la transacción | Sí | Sí |
| **ShowTransactionResult** | Mostrar página de resultado de AZUL | No | No |
| **UseCustomField1** | Campos son utilizados para proveer información adicional de la transacción al cliente final. Se debe completar con "1" para mostrar las informaciones o "0" para no mostrarlas | Sí | Sí |
| **CustomField1Label** | Este campo corresponde al label del campo de detalle #1 | No | Sí |
| **CustomField1Value** | Este campo corresponde a la información del "CustomField1Label" | No | Sí |
| **UseCustomField2** | Campos son utilizados para proveer información adicional correspondiente al segundo grupo de datos de la transacción al cliente final | Sí | Sí |
| **CustomField2Label** | Este campo corresponde al label del campo de detalle #2 | No | Sí |
| **CustomField2Value** | Este campo corresponde a la información del "CustomField2Label" | No | Sí |
| **Locale** | Valores posibles ES (español) – EN (inglés) | No | No |
| **SaveToDataVault** | Campo que da la instrucción a PaymentPage indicando que la tarjeta que digite el cliente final sea guardada en Azul. Valores: 1 = Guardar, 0 = No guardar | No | No |
| **DataVaultToken** | Campo que debe contener el token generado por Azul previamente. Si se manda este campo con el token, Azul no va a pedir la tarjeta al cliente final. Solo exigirá el Código de Seguridad, de encontrarse habilitado | No | No |

**IMPORTANTE:** Se debe enviar en el campo **"TrxType"** el valor **"Create"** y dejar el campo **"DataVaultToken"** vacío.

Página de Pagos solicitará al cliente final su tarjeta y devolverá al comercio un querystring con el token generado. Tomar en cuenta que vendrá un mensaje con ISO CODE 00.

### Transacción de venta utilizando Token Bóveda de Datos (DataVault)

El comercio contará con la posibilidad de enviar a Payment Page un mensaje para realizar la transacción de venta utilizando el token previamente generado por la tarjeta.

**Parámetro especial:**

| Parámetro | Descripción |
|-----------|-------------|
| **DatavaultToken** | FE1525FD-A59B-476A-9EFA-387D510689AB |

Se debe colocar el valor 0 indicando el no almacenar la tarjeta debido al uso del token en esta transacción en el campo **"SaveToDataVault"**. Si el campo se encuentra ausente, se asume el valor 0.

### Eliminar Token

Se coloca en el campo **"TrxType"** el valor **"Delete"** y en el campo **"DataVaultToken"** se debe colocar el token que se desea eliminar. Si es exitosa, se devuelve 00 en el **"IsoCode"**.

---

## 9. Servicio de Autenticación del Tarjetahabiente (3D Secure)

Es un protocolo de seguridad que permite proteger a tu comercio de posibles transacciones fraudulentas con tarjetas de crédito y débito. Este servicio añade una capa adicional de verificación para asegurar que la persona que realiza la compra es el titular legítimo de la tarjeta.

### Flujo de 3D Secure

Si el comercio tiene habilitada la funcionalidad de 3D Secure (autenticación del tarjetahabiente), pueden suceder dos (2) cosas al realizar una transacción de venta:

- Tarjeta de cliente final usa 3DSecure
- Tarjeta de cliente final no usa 3DSecure

En ambos casos el mensaje de entrada/salida es similar al de una venta normal. La diferencia radica en que, al cliente, si tiene 3D Secure, se le redirige a una URL generada por la institución emisora de su tarjeta para realizar una autenticación adicional.

### Campos requeridos para 3D Secure

| Campo | Descripción | Tamaño límite |
|-------|-------------|---------------|
| **CardHolderName** | Nombre tarjetahabiente | 96 caracteres incluyendo espacios |
| **CardHolderEmail** | Dirección de correo electrónico | 254 caracteres |
| **CardHolderPhoneHome** | Teléfono de la casa | 32 caracteres |
| **CardHolderPhoneMobile** | Teléfono móvil | 32 caracteres |
| **CardHolderPhoneWork** | Teléfono del trabajo | 32 caracteres |
| **CardHolderBillingAddressLine1** | Dirección de facturación – Línea 1 | 96 caracteres incluyendo espacios |
| **CardHolderBillingAddressLine2** | Dirección de facturación – Línea 2 | 96 caracteres incluyendo espacios |
| **CardHolderBillingAddressLine3** | Dirección de facturación – Línea 3 | 96 caracteres incluyendo espacios |
| **CardHolderBillingAddressCity** | Ciudad de la dirección de facturación | 96 caracteres incluyendo espacios |
| **CardHolderBillingAddressState** | Estado o provincia de la dirección de facturación | 96 caracteres incluyendo espacios |
| **CardHolderBillingAddressCountry** | País de la dirección de facturación | Enviar código ISO 2 caracteres país* |
| **CardHolderBillingAddressZip** | Código postal o "ZIP code" de la dirección de facturación | 24 caracteres incluyendo espacios |
| **CardHolderShippingAddressLine1** | Dirección de envío – Línea 1 | 96 caracteres incluyendo espacios |
| **CardHolderShippingAddressLine2** | Dirección de envío – Línea 2 | 96 caracteres incluyendo espacios |
| **CardHolderShippingAddressLine3** | Dirección de envío – Línea 3 | 96 caracteres incluyendo espacios |
| **CardHolderShippingAddressCity** | Ciudad de la dirección de envío | 96 caracteres incluyendo espacios |
| **CardHolderShippingAddressState** | Estado o provincia de la dirección de envío | 96 caracteres incluyendo espacios |
| **CardHolderShippingAddressCountry** | País de la dirección de envío | Enviar código ISO 2 caracteres país* |
| **CardHolderShippingAddressZip** | Código postal o "ZIP code" de la dirección de envío | 24 caracteres incluyendo espacios |

---

## 10. Servicio de Conversión Dinámica de Monedas – DCC

El servicio de Conversión Dinámica de Monedas – DCC brinda a los tarjetahabientes del extranjero la opción de pagar en la moneda local o en su propia moneda.

### Notas

- **Sólo aplica para ventas.** En caso de requerir anulación o devolución se aplica automáticamente la tasa original de la venta
- Compatible con Bóveda de Datos (DataVault)
- Es necesario solicitar la activación de este servicio a través de su oficial de Negocios
- Como recomendación, sugerimos compartir los resultados de la respuesta de aprobación a la tarjetahabiente finalizada la venta en el comprobante de pago y la página web

### Requerimientos de las marcas sobre DCC

En caso de que la transacción aplique para conversión de moneda, antes de enviar la solicitud de autorización a la Página de Pago, se le presenta al titular de la tarjeta una pantalla para seleccionar la moneda con la que desea pagar, en la que se le informa lo siguiente:

- **Su derecho a elegir la moneda** en la que se completará la transacción
- **Monto original de la transacción en la moneda de facturación del comercio**
- **Monto convertido en la moneda de facturación de la tarjeta.** El monto es el valor del campo "DCCAmount" y la moneda el valor del campo "DCCCurrencyAlpha" recibidos en la cadena de la respuesta
- **La tasa de conversión de moneda que se aplicará si la transacción se completa en la moneda de facturación;** Valor del campo "DCCExchangeRate" recibido en la cadena de la respuesta
- **El margen** por el servicio de conversión de moneda que se cobrará si el titular de la tarjeta selecciona DCC. Este es el valor del campo DCCMarkup recibido en la cadena de la respuesta

### Campos adicionales en la respuesta para transacciones con DCC

| Parámetro | Tipo de parámetro |
|-----------|-------------------|
| **DCCOffered** | Salida |
| **DCCApplied** | Salida |
| **DCCCurrency** | Salida |
| **DCCCurrencyAlpha** | Salida |
| **DCCExchangeRate** | Salida |
| **DCCMarkup** | Salida |
| **DCCAmount** | Salida |

### Nota final

Se debe proporcionar al tarjetahabiente la misma información divulgada en la factura o recibo de transacción de DCC.

La información relacionada con DCC en el recibo debe presentarse en inglés o en un idioma que el titular de la tarjeta pueda entender.

El recibo de la transacción no debe incluir declaraciones que induzcan a error o confundan al titular de la tarjeta. Por ejemplo, la declaración "No se han aplicado comisiones ni tarifas adicionales".

---

## 11. Pago con Cuotas

Con esta opción habilitada, podrás brindar la facilidad al tarjetahabiente de pagar con cuotas, siempre y cuando, este lo tenga configurado con su banco emisor.

### Flujo de Pago en Cuotas

1. El tarjetahabiente escoge la opción **"Pagar en cuotas"**
2. Selecciona la cantidad de cuotas y confirma que tienen el producto activo y que está seleccionando la cantidad que le permite el banco emisor
3. Al presionar el botón **"Pagar"** el cliente será dirigido al sitio del comercio a una página que le indica si la transacción fue aprobada o declinada
4. Luego de confirmar la transacción, si el correo fue ingresado en la Página de Pagos AZUL, el cliente recibirá la confirmación del pago vía correo electrónico

### Parámetros adicionales

| Parámetro | Descripción | Obligatorio | HASH |
|-----------|-------------|-------------|------|
| **UseInstallments** | Campo requerido para activar la opción de pagar con cotas en Página de Pagos. Valores: 1 = Con Cuotas, 0 = Sin Cuotas | Sí | Sí |
| **NumberOfInstallments N(99)** | Cantidad de cuotas en la cual la transacción será dividida. Dicho valor debe ser igual o superior a (1) | Sí | Sí |
| **InstallmentsInterest N(2)** | Indica si se aplicará intereses a las cuotas que se le establezcan al tarjetahabiente. Actualmente solo acepta el valor "No" | Sí | Sí |

---

## 12. PayPal

Para agregar el botón de PayPal en la Página de Pagos de AZUL, el comercio debe proveer a AZUL el **"ClientID"** otorgado por PayPal.

### Parámetros adicionales para PayPal

Además de los parámetros estándar de una transacción, es necesario enviar los siguientes campos:

| Parámetro | Descripción | Obligatorio | HASH |
|-----------|-------------|-------------|------|
| **AmountPayPalUSD** | Monto de la transacción convertido a moneda USD | Sí | Sí |
| **PayPalShippingEnabled ("1" o "0")** | Este campo es utilizado para activar el envío de la dirección. Si el comercio vende un bien material o físico debe enviar como requerido la dirección, para esto el campo debe recibir el valor: "1" y adicionalmente todos los campos de shipping poblados conforme se especifica en cada uno. En caso que el comercio se dedique a ofrecer bienes digitales o servicios debe enviar el valor: "0", **no debe enviar los demás campos de Shipping** | Sí | Sí |
| **PayPalShippingRecipient Name (127,req)** | Este campo debe indicar el nombre del cliente y el mismo tiene un máximo de 127 caracteres. Es requerido siempre que el comercio haya enviado el valor "1" en el campo: **"PayPalShippingEnabled"** | No | Sí |
| **PayPalShippingLine1 (100,req)** | Este campo debe indicar la dirección del cliente y tiene un máximo de 100 caracteres. Por ejemplo, número, calle, etc. Es requerido siempre que el comercio haya enviado el valor "1" en el campo: **"PayPalShippingEnabled"** | No | Sí |
| **PayPalShippingLine2 (100)** | Este campo debe indicar parte de la dirección ya sea apartamento, calle etc. y tiene un máximo de 10 caracteres. Por ejemplo, número de suite o apartamento. Es requerido siempre que el comercio haya enviado el valor "1" en el campo: **"PayPalShippingEnabled"** | No | Sí |
| **PayPalShippingPostalCode (Req)** | Este campo debe indicar el código postal dependiendo el país. Es requerido siempre que el comercio haya enviado el valor "1" en el campo: **"PayPalShippingEnabled"** | No | Sí |
| **PayPalShippingCity (64, req)** | Este campo debe indicar la ciudad y tiene un máximo de 64 caracteres. Es requerido siempre que el comercio haya enviado el valor "1" en el campo: **"PayPalShippingEnabled"** | No | Sí |
| **PayPalShippingState (40,req)** | Este campo debe indicar el estado y tiene un máximo de 40 caracteres. Es requerido siempre que el comercio haya enviado el valor "1" en el campo: **"PayPalShippingEnabled"** | No | Sí |
| **PayPalShippingCountryCode (2,req)** | Este campo debe indicar el código del país y tiene un máximo de 2 caracteres. Deben proveer el Region Code oficial de PayPal. Para más consultar los mismos puede acceder a esta URL: https://developer.paypal.com/docs/integration/direct/rest/country-codes/ Es requerido siempre que el comercio haya enviado el valor "1" en el campo: **"PayPalShippingEnabled"** | No | Sí |
| **PayPalShippingPhone (50, req)** | Este campo debe indicar el número de teléfono o celular del cliente. Es requerido siempre que el comercio haya enviado el valor "1" en el campo: **"PayPalShippingEnabled"** | No | Sí |
| **PayPalShippingType (req)** | Este campo debe indicar el tipo de pago. Por ejemplo, Regalos, Pago adeudado, Adelanto en efectivo, etc. Es requerido siempre que el comercio haya enviado el valor "1" en el campo: **"PayPalShippingEnabled"** | No | Sí |

### Parámetros de respuesta de PayPal

| Parámetro | Descripción | HASH |
|-----------|-------------|------|
| **OrderNumber** | El número de orden enviado en el requerimiento inicial | Sí |
| **Amount** | Monto original de la transacción | Sí |
| **ITBIS** | ITBIS original de la transacción | No |
| **AuthorizationCode** | Código de autorización en caso de que la transacción haya sido aprobada | - |
| **DateTime** | Fecha de la transacción | - |
| **ResponseCode** | Respuesta de la transacción. Nota: Esta respuesta siempre incluirá la palabra PayPal inicialmente | - |
| **IsoCode** | Respuesta de la transacción | - |
| **RRN** | Número de referencia (Reference Referral Number) | - |

### IPN (Instant Payment Notification)

Es un servicio de mensajes que notifica automáticamente a los comerciantes de eventos relacionados con transacciones de PayPal.

Si el cliente dispone de este servicio debe indicarlo a AZUL y se le proveerá la URL que debe configurar en su página de PayPal para estos fines.

### ResponseCode estatus

El campo **"ResponseCode"**, puede recibir uno de estos posibles status:

- **PAYPAL-IPN-UNVERIFIED**: Significa que la transacción no fue validada por IPN (Instant Payment Notification), ya sea porque no se recibió respuesta de PayPal o porque no está habilitado IPN. Esta es una respuesta válida si el comercio no tiene activo IPN en PayPal. En este caso el Merchant debe revisar la transacción manualmente en su cuenta de PayPal
- **PAYPAL-IPN-VERIFIED**: Significa que la transacción fue validada por IPN. En este caso PayPal notifica directamente al comercio, conforme a la configuración que el comercio haya establecido en la página de PayPal
- **PAYPAL-IPN-MISMATCH**: Significa que la data recibida de PayPal para la transacción con IPN no coincide con lo que se recibió del browser del cliente

---

## 13. Portal de Desarrolladores AZUL

Es una plataforma que permite a tu comercio la facilidad de los servicios de pago en línea. Está diseñado para desarrolladores y ofrece una variedad de recursos y herramientas para implementar soluciones de pago de manera eficiente y segura.

Puedes acceder a través de la página de AZUL o directamente al portal en el siguiente enlace: **Portal para Desarrolladores AZUL**

Podrás encontrar información sobre:

- **Documentación detallada**: Proporciona guías, manuales y ejemplos de integración para ayudar a los desarrolladores a implementar los servicios de AZUL
- **APIs y Webservices**: Permite aceptar pagos con tarjetas desde páginas web o aplicaciones móviles, ofreciendo una integración directa y segura
- **Servicios de Seguridad**: Incluye opciones de tokenización y autenticación 3D Secure para proteger las transacciones en línea

---

## 14. Rastreo y reporte de inconvenientes

Al momento de presentar un inconveniente con el servicio, por favor comunícalo a nuestra unidad de Soluciones Integradas en el **809-544-3760**, o también vía correo a la dirección **solucionesecommmerce@AZUL.com.do**

### Procurar tener los siguientes elementos:

- Numero de comercio
- Fecha / hora de inconveniente
- Logs o trace del error que presenta
- Logs o trace del requerimiento que haces desde tu sistema al nuestro
- Interpretación de lo ocurrido en tu sistema con la respuesta recibida

Para poder lograr tener estos datos y para análisis interno de cada comercio sobre comportamiento y otros temas de interés, sugerimos que su sistema sea capaz de contar con los mensajes de entrada y salida, tiempos de respuesta.

**Tomar en cuenta que no se deben guardar datos de tarjetas en los sistemas, traces o logs.**

---

## Contacto

Para soporte técnico o dudas sobre la integración:
- **Teléfono:** 809-544-3760
- **Email:** solucionesecommmerce@AZUL.com.do
- **Portal de Desarrolladores:** Disponible desde la página oficial de AZUL

---

**Documento generado el:** 2025-10-09
