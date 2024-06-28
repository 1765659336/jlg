<template>
	<div class="modals-container">
		<component
			v-bind="{ ...modal.props, modalOptions: modal.modalOptions }"
			:is="modal.component"
			v-for="modal in dynamicModalStore.modals"
			:key="modal.key"
			:name="modal.component.name ?? modal.key"
		>
		</component>
		<el-popover
			v-if="dynamicModalStore.modals.length > 0"
			popper-class="minimize-popper-container"
			placement="left"
			title="模态管理"
			width="280"
			trigger="click"
			:disabled="disabled"
			:teleported="false"
		>
			<ul class="minimize-modal-list" style="height: auto">
				<li v-for="modal in dynamicModalStore.modals" :key="modal.key" class="modal-item" @dblclick="restoreModal(modal)">
					<p class="g-text-overflow-hidden" :title="modal.modalOptions.title.toString()">
						{{ modal.modalOptions.title }}
					</p>
					<p>
						<i
							v-show="modal.modalOptions.modelValue"
							style="display: inline-block"
							:class="`vxe-modal--zoom-btn trigger--btn ${GlobalConfig.icon.MODAL_MINUS}`"
							title="最小化"
							@click="closeEvent(modal, 'hide')"
						/>
						<i
							v-show="!modal.modalOptions.modelValue"
							style="display: inline-block"
							:class="`vxe-modal--zoom-btn trigger--btn ${GlobalConfig.icon.MODAL_ZOOM_OUT}`"
							title="还原"
							@click="restoreModal(modal)"
						/>
						<i
							style="display: inline-block; margin-left: 10px"
							:class="`vxe-modal--close-btn trigger--btn ${GlobalConfig.icon.MODAL_CLOSE}`"
							title="关闭"
							@click="closeEvent(modal, 'close')"
						/>
					</p>
				</li>
			</ul>
			<template #reference>
				<div ref="sortableRef" style="position: fixed; z-index: 88; transition: all 0.15s ease 0s">
					<el-badge type="primary" class="el-badge" :value="dynamicModalStore.modals ? dynamicModalStore.modals.length : 0">
						<div>
							<el-button circle>
								<i :class="`trigger--btn ${GlobalConfig.icon.MODAL_MENU}`" />
							</el-button>
						</div>
					</el-badge>
				</div>
			</template>
		</el-popover>
	</div>
</template>

<!-- 组合式API setup语法糖 -->
<script lang="ts" setup>
import { dynamicModalStore, useDynamicModal } from './index';
import { T_Modal_Params } from './type';
import GlobalConfig from '../../../lib/useGlobalConfig';
import Sortable from 'sortablejs';
import { nextTick, watch, onUnmounted, onMounted } from 'vue';
import debounce from 'xe-utils/debounce';
import toNumber from 'xe-utils/toNumber';

defineOptions({
	name: 'JlgDynamicModal',
});

const { closeModal } = useDynamicModal();

function closeEvent(modal: T_Modal_Params, type: 'hide' | 'close') {
	const { name } = modal.component;
	closeModal(name, type);
}

function restoreModal(modal: T_Modal_Params) {
	modal.modalOptions.modelValue = true;
}

const sortableRef = ref<HTMLElement>();
const disabled = ref(false);

// 创建一个响应式引用来保存 sortable 实例
const sortable = ref(null);
watch(
	() => dynamicModalStore.modals.length,
	(newVal, oldValue) => {
		if (newVal > 0 && oldValue === 0) {
			nextTick(() => {
				const defaultMargins = sortableRef.value.offsetWidth / 2 + 'px';
				const itemEl = sortableRef.value;
				sortableRef.value.style.right = defaultMargins;
				sortableRef.value.style.bottom = defaultMargins;

				sortable.value = Sortable.create(itemEl, {
					forceFallback: true,
					onStart() {
						disabled.value = true;
					},
					onEnd: function (evt: any) {
						const clientX = evt?.originalEvent?.clientX > 0 ? evt?.originalEvent?.clientX : sortableRef.value.offsetWidth;
						const clientY = evt?.originalEvent?.clientY > 0 ? evt?.originalEvent?.clientY : sortableRef.value.offsetHeight;
						onDraggablePosition({ clientX, clientY });
					},
				});
			});
		}
	}
);

// 可拖拽的位置,
const onDraggablePosition = ({ clientX = 0, clientY = 0 }) => {
	const defaultMargins = sortableRef.value.offsetWidth + 'px';
	const itemEl = sortableRef.value;
	disabled.value = false;
	const windowWidth = window.innerWidth;
	const width = itemEl.offsetWidth / 2;
	const height = itemEl.offsetHeight / 2;

	const sortablePosTop = clientY - height;
	const sortablePosRight = windowWidth - clientX - width > 0 ? windowWidth - clientX - width : sortableRef.value.offsetHeight / 2;

	const centerX = (windowWidth - width) / 2;
	if (sortablePosRight < centerX) {
		itemEl.style.right = defaultMargins;
		itemEl.style.left = 'auto';
	} else {
		itemEl.style.left = defaultMargins;
		itemEl.style.right = 'auto';
	}
	itemEl.style.bottom = 'auto';
	itemEl.style.top = sortablePosTop + 'px';
};

// 窗口变化时，通过判断当前窗口的高度，来判断是否需要重新设置拖拽 y 轴的位置
let lastWindowHeight = window.innerHeight;
const handleResize = () => {
	const currentWindowHeight = window.innerHeight;
	if (currentWindowHeight > lastWindowHeight) {
		lastWindowHeight = currentWindowHeight;
		return;
	}
	lastWindowHeight = currentWindowHeight;
	if (sortableRef.value && dynamicModalStore.modals.length > 0) {
		const defaultMargins = sortableRef.value.offsetWidth / 2;
		const topNumber = toNumber(sortableRef.value.style.top);
		if (currentWindowHeight <= topNumber + sortableRef.value.offsetHeight) {
			if (topNumber > 0) {
				sortableRef.value.style.top = defaultMargins + 'px';
			}
		}
	}
};

onMounted(() => {
	// 监听window的resize事件
	window.addEventListener('resize', debounce(handleResize, 220));
});

onUnmounted(() => {});
</script>
