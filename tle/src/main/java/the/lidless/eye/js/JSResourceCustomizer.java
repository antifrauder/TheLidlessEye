package the.lidless.eye.js;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.Scanner;

public class JSResourceCustomizer {

	//TODO move
	public static final String SITEMARK_COOKIE_EXPIRES_KEY = "the.lidless.eye.sitemark.cookie.expires";
	public static final String SITEMARK_COOKIE_DOMAIN_KEY = "the.lidless.eye.sitemark.cookie.domain";
	public static final String SITEMARK_COOKIE_PATH_KEY = "the.lidless.eye.sitemark.cookie.path";
	
	private String jsTemplatePath;
	private String jsPropertiesPath;

	public JSResourceCustomizer() {
		super();
	}
	
	public JSResourceCustomizer(String jsTemplatePath, String jsPropertiesPath) {
		super();
		this.jsTemplatePath = jsTemplatePath;
		this.jsPropertiesPath = jsPropertiesPath;
	}

	public void setJsTemplatePath(String jsTemplatePath) {
		this.jsTemplatePath = jsTemplatePath;
	}
	public void setJsPropertiesPath(String jsPropertiesPath) {
		this.jsPropertiesPath = jsPropertiesPath;
	}

	public String getCustomizedJs() throws IOException {

		String jsTemplate = loadJsTemplate();
		Properties jsProperties = loadJsProperties();
		
		JSCustomizer jsCustomizer = new JSCustomizer(jsTemplate, jsProperties.getProperty(SITEMARK_COOKIE_EXPIRES_KEY), 
				jsProperties.getProperty(SITEMARK_COOKIE_DOMAIN_KEY), jsProperties.getProperty(SITEMARK_COOKIE_PATH_KEY));

		return jsCustomizer.getCustomizedJs();
	}
	
	private String loadJsTemplate() {
		Scanner scanner = new Scanner(getClass().getResourceAsStream(jsTemplatePath));
		try {
			return scanner.useDelimiter("\\A").next();
		} finally {
			scanner.close();
		}
	}
	
	private Properties loadJsProperties() throws IOException {
		Properties jsProperties = new Properties();
		InputStream in = getClass().getResourceAsStream(jsPropertiesPath);
		try {
			jsProperties.load(in);
		} finally {
			in.close();
		}
		return jsProperties;
	}

}
