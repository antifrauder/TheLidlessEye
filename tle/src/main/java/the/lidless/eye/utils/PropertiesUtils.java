package the.lidless.eye.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PropertiesUtils {

	public static Properties loadProperties(String path) {
		Properties props = new Properties();
		InputStream propInputStream = Properties.class.getClassLoader().getResourceAsStream(path);
		try {
			props.load(propInputStream);
		} catch (IOException e){
			throw new RuntimeException("Cannot load properties : " + path, e);
		} finally {
			try {
				propInputStream.close();
			} catch (IOException e) {
				//do nothing
			}
		}
		return props;
	}

}
