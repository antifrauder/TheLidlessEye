package the.lidless.eye.utils;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import the.lidless.eye.sitemark.SiteMarkSubTypes;

public class ReflectionUtils {

//	public static List<String> getPublicStaticFieldNames(final Class<?> clazz) {
//		if (clazz == null)
//			return null;
//
//		List<String> publicStaticFieldNames = new LinkedList<>();
//		for (Field curField : clazz.getFields()) {
//			if (Modifier.isStatic(curField.getModifiers())) {
//				publicStaticFieldNames.add(curField.getName());
//			}
//		}
//		return publicStaticFieldNames;
//	}

	public static List<Object> getPublicStaticFieldValues(final Class<?> clazz) {
		if (clazz == null)
			return null;

		List<Object> publicStaticFieldNames = new LinkedList<>();
		for (Field curField : clazz.getFields()) {
			if (Modifier.isStatic(curField.getModifiers())) {
				try {
					publicStaticFieldNames.add(curField.get(null));
				} catch (IllegalArgumentException | IllegalAccessException e) {
					//do nothing
				}
			}
		}
		return publicStaticFieldNames;
	}

	public static List<String> getPublicStaticStringFieldValues(final Class<?> clazz) {
		List<Object> values = getPublicStaticFieldValues(clazz);
		if (values == null)
			return null;
		
		List<String> stringValues = new ArrayList<>();
		for (Object curValAsObject : values) {
			if (curValAsObject instanceof String)
				stringValues.add((String) curValAsObject);
		}

		return stringValues;
	}

//	public static String getPublicStaticFieldValue(final Class<?> clazz, final String fieldName) {
//		if ((clazz == null) || (fieldName == null))
//			return null;
//		try {
//			Field entityNameField = clazz.getField(fieldName);
//			return (String) entityNameField.get(null);
//		} catch (NoSuchFieldException | SecurityException | IllegalArgumentException | IllegalAccessException e) {
//			return null;
//		}
//	}
//

}
