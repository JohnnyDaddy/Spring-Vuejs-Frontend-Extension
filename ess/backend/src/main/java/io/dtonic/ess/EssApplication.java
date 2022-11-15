package io.dtonic.ess;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = { "io.dtonic.ess" })
public class EssApplication {

  public static void main(String[] args) {
    SpringApplication.run(EssApplication.class, args);
  }
}
