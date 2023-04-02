# Java Code Formatting

## Options

There are several options for formatting code in Java. However, none of them provide a solution for a consistent and opinionated setup like ESLint and Prettier in JavaScript.

**Important: A combination of Checkstyle and IntelliJ code style XML is commonly used to make code formatting opinionated. This guide is a perfect example: <https://github.com/duraspace/codestyle/blob/master/ide-support/intellij.md>**

The following tools are available for code formatting and linting.

- [Checkstyle](#checkstyle)
- [google-java-format](#google-java-format)
- [Spotless](#spotless)
- [spring-javaformat](#spring-javaformat)

## Checkstyle

- Add plugin to `pom.xml`.

  ```xml
  <plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-checkstyle-plugin</artifactId>
    <version>3.2.1</version>
    <configuration>
      <configLocation>google_checks.xml</configLocation>
      <consoleOutput>true</consoleOutput>
      <failsOnError>true</failsOnError>
      <linkXRef>false</linkXRef>
      <failOnViolation>true</failOnViolation>
      <violationSeverity>warning</violationSeverity>
    </configuration>
    <executions>
      <execution>
        <id>validate</id>
        <phase>validate</phase>
        <goals>
          <goal>check</goal>
        </goals>
      </execution>
    </executions>
  </plugin>
  ```

- Download [google_checks.xml](https://github.com/checkstyle/checkstyle/blob/master/src/main/resources/google_checks.xml) and make it a part of the repo.
- Install plugin in IntelliJ: [https://plugins.jetbrains.com/plugin/1065-checkstyle-idea](https://plugins.jetbrains.com/plugin/1065-checkstyle-idea)
  - Go to Settings → Editor → Code Style → Java → Gear Icon → Import schema → Checkstyle configuration
  - It's recommended to instead use a separate IntelliJ code style XML like XWiki because it has more configuration options.
- Now you can format a file or the whole directory/module using "Reformat code" from context menu.

## google-java-format

- Install the [google-java-format](https://plugins.jetbrains.com/plugin/8527) plugin and [configure it](https://github.com/google/google-java-format/blob/master/README.md#intellij-android-studio-and-other-jetbrains-ides).
- Use spotless for setting it up with maven goals: [https://github.com/diffplug/spotless/tree/main/plugin-maven#google-java-format](https://github.com/diffplug/spotless/tree/main/plugin-maven#google-java-format)

## Spotless

- Add plugin to `pom.xml`.

  ```xml
  <plugin>
      <groupId>com.diffplug.spotless</groupId>
      <artifactId>spotless-maven-plugin</artifactId>
      <version>2.9.0</version>
      <configuration>
          <java>
              <includes>
                  <include>src/main/java/**/*.java</include> <!-- Check application code -->
                  <include>src/test/java/**/*.java</include> <!-- Check application tests code -->
              </includes>
              <googleJavaFormat>
                  <version>1.15.0</version>
                  <style>GOOGLE</style>
              </googleJavaFormat>
          </java>
      </configuration>
  </plugin>
  ```

- Go through the guide: [https://github.com/diffplug/spotless/tree/main/plugin-maven](https://github.com/diffplug/spotless/tree/main/plugin-maven)
- The plugin only works with gradle and not maven. However, can be used in combination with the [google-java-format plugin](https://github.com/google/google-java-format#intellij-android-studio-and-other-jetbrains-ides).

## spring-javaformat

- Add this and the checkstyle plugin to `pom.xml`.

  ```xml
  <plugin>
    <groupId>io.spring.javaformat</groupId>
    <artifactId>spring-javaformat-maven-plugin</artifactId>
    <version>0.0.38</version>
    <executions>
      <execution>
        <phase>validate</phase>
        <inherited>true</inherited>
        <goals>
          <goal>validate</goal>
        </goals>
      </execution>
    </executions>
  </plugin>
  <plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-checkstyle-plugin</artifactId>
    <version>3.1.1</version>
    <dependencies>
      <dependency>
        <groupId>com.puppycrawl.tools</groupId>
        <artifactId>checkstyle</artifactId>
        <version>9.3</version>
      </dependency>
      <dependency>
        <groupId>io.spring.javaformat</groupId>
        <artifactId>spring-javaformat-checkstyle</artifactId>
        <version>0.0.38</version>
      </dependency>
    </dependencies>
    <executions>
      <execution>
        <id>checkstyle-validation</id>
        <phase>validate</phase>
        <inherited>true</inherited>
        <configuration>
          <configLocation>io/spring/javaformat/checkstyle/checkstyle.xml</configLocation>
          <includeTestSourceDirectory>true</includeTestSourceDirectory>
        </configuration>
        <goals>
          <goal>check</goal>
        </goals>
      </execution>
    </executions>
  </plugin>
  ```

- Manually install IntelliJ plugin for auto format: [https://github.com/spring-io/spring-javaformat#intellij-idea](https://github.com/spring-io/spring-javaformat#intellij-idea)
- Create a checkstyle file and set it up in the IDE: [https://github.com/spring-io/spring-javaformat#checkstyle-idea-plugin](https://github.com/spring-io/spring-javaformat#checkstyle-idea-plugin)

  ```xml
  <?xml version="1.0"?>
  <!DOCTYPE module PUBLIC
      "-//Checkstyle//DTD Checkstyle Configuration 1.3//EN"
      "https://checkstyle.org/dtds/configuration_1_3.dtd">
  <module name="com.puppycrawl.tools.checkstyle.Checker">
    <module name="io.spring.javaformat.checkstyle.SpringChecks" />
  </module>
  ```
