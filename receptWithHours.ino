#include <RCSwitch.h>
#include <TimeLib.h>

RCSwitch mySwitch;
unsigned long lastReceivedCode = 0;
const unsigned long specialCode = 174727269;

void setup() {
  Serial.begin(9600);
  mySwitch.enableReceive(0);
  mySwitch.enableTransmit(10);
  setSyncProvider(getNtpTime);
}

void loop() {
  if (mySwitch.available()) {
    unsigned long codigoRecebido = mySwitch.getReceivedValue();
    processReceivedCode(codigoRecebido);
  }
}

void processReceivedCode(unsigned long codigo) {
  if (codigo != 0) {
    
    if (codigo == specialCode) {
      emitLastReceivedCode();
      return;
    }

    Serial.print("Código Recebido: ");
    Serial.println(codigo);
    
    lastReceivedCode = codigo;
    
    Serial.print("Data e Hora: ");
    printDateTime(now());
    
    mySwitch.resetAvailable();
  }
}

void emitLastReceivedCode() {
  if (lastReceivedCode != 0) {
    Serial.print("Emitindo último sinal armazenado: ");
    Serial.println(lastReceivedCode);
    mySwitch.send(lastReceivedCode, 24);
  }
}

void printDateTime(time_t timestamp) {
  Serial.print(year(timestamp));
  Serial.print("-");
  print2digits(month(timestamp));
  Serial.print("-");
  print2digits(day(timestamp));
  Serial.print(" ");
  print2digits(hour(timestamp));
  Serial.print(":");
  print2digits(minute(timestamp));
  Serial.print(":");
  print2digits(second(timestamp));
  Serial.println();
}

void print2digits(int number) {
  if (number < 10) {
    Serial.print("0");
  }
  Serial.print(number);
}

time_t getNtpTime() {
  return 0;
}
