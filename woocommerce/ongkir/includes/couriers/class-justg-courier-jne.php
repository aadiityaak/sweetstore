<?php
/**
 * The file that defines the ongkir_Courier_JNE class
 *
 * @link       https://github.com/sofyansitorus
 * @since      1.2.12
 *
 * @package    justg
 * @subpackage justg/includes
 */

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * The ongkir_Courier_JNE class.
 *
 * @since      1.2.12
 * @package    justg
 * @subpackage justg/includes
 * @author     Sofyan Sitorus <sofyansitorus@gmail.com>
 */
class ongkir_Courier_JNE extends ongkir_Courier {

	/**
	 * Courier Code
	 *
	 * @since 1.2.12
	 *
	 * @var string
	 */
	public $code = 'jne';

	/**
	 * Courier Label
	 *
	 * @since 1.2.12
	 *
	 * @var string
	 */
	public $label = 'JNE';

	/**
	 * Courier Website
	 *
	 * @since 1.2.12
	 *
	 * @var string
	 */
	public $website = 'http://www.jne.co.id';

	/**
	 * Get courier services for domestic shipping
	 *
	 * @since 1.2.12
	 *
	 * @return array
	 */
	public function get_services_domestic_default() {
		return array(
			'CTC'    => 'City Courier',
			'CTCYES' => 'City Courier YES',
			'OKE'    => 'Ongkos Kirim Ekonomis',
			'REG'    => 'Layanan Reguler',
			'YES'    => 'Yakin Esok Sampai',
		);
	}

	/**
	 * Get courier services for international shipping
	 *
	 * @since 1.2.12
	 *
	 * @return array
	 */
	public function get_services_international_default() {
		return array(
			'INTL' => 'INTL',
		);
	}

	/**
	 * Get courier account for domestic shipping
	 *
	 * @since 1.2.12
	 *
	 * @return array
	 */
	public function get_account_domestic() {
		return array(
			'starter',
			'basic',
			'pro',
		);
	}

	/**
	 * Get courier account for international shipping
	 *
	 * @since 1.2.12
	 *
	 * @return array
	 */
	public function get_account_international() {
		return array(
			'pro',
		);
	}
}
