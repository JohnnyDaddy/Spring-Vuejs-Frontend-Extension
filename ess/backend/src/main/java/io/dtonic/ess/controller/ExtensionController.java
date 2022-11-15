package io.dtonic.ess.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExtensionController {

  @Value("${ess.applyExtensions}")
  Boolean applyExtensions = false;

  @CrossOrigin(origins = "http://localhost:8080")
  @GetMapping("/applyExtensions")
  public Boolean applyExtensions() {
    return applyExtensions;
  }
}
